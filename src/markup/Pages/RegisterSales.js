import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import history from "../../history";
import PartnerHeader from "../Layout/PartnerHeader";
import {registerInvoice, uploadFile} from "../../http/http-calls";
import {loadPartnerCustomersAction} from "../../redux/actions/partner";
import {getPartnerCustomers} from "../../redux/selectors/partner";
import {CUSTOMER_APPLICATION_STATUS} from "../../constants";
import ExcelImportModal from "./Modals/ExcelImportModal";
import {decodeToken} from "../../common";

const defaultInstallment = {
	date: '',
	amount: ''
};

const formSchema = Yup.object().shape({
	customer: Yup.string()
		.test(
			'is-valid',
			'Select Customer',
			value => value !== '-1'
		)
		.typeError('Select Customer'),
	date: Yup.string()
		.required('Required'),
	amount: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	invoiceNumber: Yup.number()
		.required('Required'),
	installments: Yup.array()
		.of(
			Yup.object().shape({
				date: Yup.string()
					.required('Required'),
				amount: Yup.string()
					.test(
						'is-decimal',
						'You must enter a valid number',
						value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
					)
					.typeError('You must enter a valid number')
					.required('Required')
			}),
		),
	filenameInvoice: Yup.string()
		.required('Required'),
	filenameInvoiceOriginal: Yup.string()
		.required('Required'),
	filenameExcel: Yup.string()
		.required('Required'),
	filenameExcelOriginal: Yup.string()
		.required('Required'),
});

class RegisterSales extends Component {
	state = {
		modalVisible: false,
	}

	componentDidMount() {
		const {
			loadPartnerCustomers,
			match,
			setFieldValue,
		} = this.props;

		if (match.params.id) {
			setFieldValue('customer', match.params.id);
		}

		const userDetails = decodeToken();

		if (userDetails && userDetails.partner && userDetails.partner.id) {
			loadPartnerCustomers(userDetails.partner.id);
		}
	}

	navigateTo = (path) => {
		this.props.history.push({
			pathname: path,
			from: '/customer-step2'
		});
	};

	addArrayProperty = (key) => {
		const {values, setFieldValue} = this.props;

		const data = values[key];
		let temp = JSON.parse(JSON.stringify(data));
		temp.push(defaultInstallment);

		setFieldValue(key, temp);
	};

	deleteArrayProperty = (key, index) => {
		const {values, setFieldValue} = this.props;

		const data = values[key];
		let temp = JSON.parse(JSON.stringify(data));
		temp.splice(index, 1);

		setFieldValue(key, temp);
	};

	changeFile = async (e, stateName) => {
		const {setFieldValue} = this.props;
		const originName = (e.target['files'][0].name);

		const payload = new FormData();
		payload.append('file', e.target['files'][0], originName);

		try {
			const res = await uploadFile(payload);
			setFieldValue([stateName], res.path);
			setFieldValue([`${stateName}Original`], originName);
		} catch (e) {
			console.error(e);
		}
	};

	filterCustomers = () => {
		const {partnerCustomers} = this.props;

		return partnerCustomers && partnerCustomers.filter(customer => {
			const completedSteps = customer.logs && customer.logs.filter(log => log.status === CUSTOMER_APPLICATION_STATUS.COMPLETED);
			return completedSteps.length === 5;
		});
	}

	onClickImport = (data) => {
		const {
			setFieldValue
		} = this.props;

		setFieldValue('customer', data.invoice && data.invoice.customer);
		setFieldValue('amount', data.invoice && data.invoice.amount);
		setFieldValue('date', data.invoice && data.invoice.date);
		setFieldValue('invoiceNumber', data.invoice && data.invoice.invoiceNumber);
		setFieldValue('installments', data.installments);

		this.onClickCancel();
	}

	onClickCancel = () => {
		this.setState({modalVisible: false});
	}

	render() {
		const {
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
			status,
		} = this.props;
		const {modalVisible} = this.state;
		const completedCustomers = this.filterCustomers();
		const selectedCustomer = completedCustomers && completedCustomers.find(item => item.id == values['customer']);

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<ExcelImportModal
					show={modalVisible}
					onClickImport={this.onClickImport}
					onClickCancel={this.onClickCancel}
				/>
				<PartnerHeader/>
				<PageTitle title='Register Customer Sales Invoice (Sales - Daily)'/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-body">
										<div className='row form-group'>
											<div className='col-md-12 text-center'>
												<button
													className='btn btn-primary w-25'
													type='button'
													onClick={() => this.setState({modalVisible: true})}
												>
													COPY FROM EXCEL
												</button>
											</div>
										</div>
										<Form className="personal_validate">
											<div className="form-row">
												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Customer*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type="text"
																name="customer"
																className={`form-control ${errors.customer && touched.customer && 'is-invalid'}`}
																value={(selectedCustomer && selectedCustomer.tradingName) || ''}
																disabled={true}
															/>
															{/*<select
																className={`form-control ${errors.customer && touched.customer && 'is-invalid'}`}
																name='customer'
																value={values['customer']}
																disabled={true}
																onChange={(e) => setFieldValue('customer', e.target.value)}
															>
																<option value='-1'>Select Customer</option>
																{
																	completedCustomers && completedCustomers.map((customer, index) => (
																		<option value={customer.id} key={`customer-${index}`}>
																			{customer.tradingName}
																		</option>
																	))
																}
															</select>*/}
															{errors.customer && touched.customer ?
																<div className="invalid-feedback">{errors.customer}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Invoice Date*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type='date'
																className={`form-control ${errors.date && touched.date && 'is-invalid'}`}
																value={values["date"]}
																onChange={(e) => setFieldValue(`date`, e.target.value)}
															/>
															{errors.date && touched.date ?
																<div className="invalid-feedback">{errors.date}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Amount TZS*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type="text"
																name="amount"
																placeholder="Requested Credit in TZS"
																className={`form-control text-right ${errors.amount && touched.amount && 'is-invalid'}`}
																value={values["amount"]}
																onChange={(e) => setFieldValue('amount', e.target.value)}
															/>
															{errors.amount && touched.amount ?
																<div className="invalid-feedback">{errors.amount}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Invoice Number*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type="number"
																placeholder=""
																name="invoiceNumber"
																className={`form-control ${errors.invoiceNumber && touched.invoiceNumber && 'is-invalid'}`}
																value={values["invoiceNumber"]}
																onChange={(e) => setFieldValue('invoiceNumber', e.target.value)}
															/>
															{errors.invoiceNumber && touched.invoiceNumber ?
																<div className="invalid-feedback">{errors.invoiceNumber}</div> : null}
														</div>
													</div>
												</div>
											</div>

											<div className="form-row">
												<div className="form-group col-xl-12 mb-0">
													<div className="row">
														<div className="col-xl-12">
															<label className="mr-sm-2 mt-2">Installments*</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-12">
													<div className="transaction-table">
														<div className="table-responsive">
															<table className="table mb-0 table-responsive-sm table-borderless">
																<thead>
																<tr>
																	<td className="pt-0 pb-0">
																		<label>
																			Date
																		</label>
																	</td>
																	<td className="pt-0 pb-0">
																		<label>
																			Amount
																		</label>
																	</td>
																	<td className="pt-0 pb-0">

																	</td>
																	<td className="pt-0 pb-0">

																	</td>
																</tr>
																</thead>

																<tbody>
																{
																	values.installments && values.installments.map((item, key) => {
																		return (
																			<tr key={`installment${key}`}>
																				<td className="pt-0 pb-1">
																					<input
																						type='date'
																						className={`form-control`}
																						value={values["installments"][key].date}
																						onChange={(e) => setFieldValue(`installments[${key}].date`, e.target.value)}
																					/>
																				</td>
																				<td className="pt-0 pb-1">
																					<input
																						type="text"
																						placeholder="TSZ"
																						className={`form-control text-right`}
																						value={values["installments"][key].amount}
																						onChange={(e) => setFieldValue(`installments[${key}].amount`, e.target.value)}
																					/>
																				</td>
																				<td className="pt-0 pb-1">
																					{
																						(key !== 0) && (
																							<span
																								className={'large-round-icon bg-danger'}
																								onClick={() => this.deleteArrayProperty('installments', key)}
																							>
																										<i className="fa fa-close"/>
																									</span>
																						)
																					}
																				</td>
																				<td className="pt-0 pb-1">
																					{
																						(key === (values.installments.length - 1)) && (
																							<span
																								className={'large-round-icon bg-primary'}
																								onClick={() => this.addArrayProperty('installments')}
																							>
																										<i className="fa fa-plus"/>
																									</span>
																						)
																					}
																				</td>
																			</tr>
																		)
																	})
																}
																</tbody>
															</table>
															{errors.installments && touched.installments ?
																<div className="invalid-feedback"
																		 style={{display: 'block'}}>Not Valid</div> : null}
														</div>
													</div>
													{
														status && status.submitTried && !checkAmountValidation(values) && (
															<div className="invalid-feedback"
																	 style={{display: 'block'}}>Sum of installments not equal to amount of invoice</div>
														)
													}
												</div>
											</div>

											<div className='form-row mt-3'>
												<div className="col-md-2 form-group">
													<label className="mr-sm-2 mt-2">Invoice*</label>
												</div>

												<div className="col-md-5 form-group">
													<div
														className="file-upload-wrapper"
														data-text={values['filenameInvoiceOriginal']}
													>
														<input
															name="file-upload-field"
															type="file"
															className="file-upload-field"
															accept=".pdf,.doc,.jpg,.png"
															onChange={(e) => this.changeFile(e, 'filenameInvoice')}
														/>
													</div>
													{errors.filenameInvoice && touched.filenameInvoice ?
														<div className="invalid-feedback"
																 style={{display: 'block'}}>Select File</div> : null}
												</div>
											</div>

											<div className='form-row mt-3'>
												<div className="col-md-2 form-group">
													<label className="mr-sm-2 mt-2">Excel form*</label>
												</div>

												<div className="col-md-5 form-group">
													<div
														className="file-upload-wrapper"
														data-text={values['filenameExcelOriginal']}
													>
														<input
															name="file-upload-field"
															type="file"
															className="file-upload-field"
															accept=".pdf,.doc,.jpg,.png"
															onChange={(e) => this.changeFile(e, 'filenameExcel')}
														/>
													</div>
													{errors.filenameExcel && touched.filenameExcel ?
														<div className="invalid-feedback"
																 style={{display: 'block'}}>Select File</div> : null}
												</div>
											</div>

											<div className="form-row">
												<div className="form-group col-12 text-center">
													<button className="btn btn-success pl-5 pr-5 mb-2 w-25" type="submit">SAVE</button>
												</div>
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const checkAmountValidation = (values) => {
	let sum = 0;
	values && values.installments.map(installment => {
		sum += parseFloat(installment.amount);
	});

	return (sum === parseFloat(values['amount']));
};

const stringToNumber = (values) => {
	const temp = JSON.parse(JSON.stringify(values));
	temp['amount'] = parseFloat(temp['amount']);
	temp.installments && temp.installments.map((item, key) => {
		temp['installments'][key]['amount'] = parseFloat(item.amount);
	});

	return temp;
};

const EnhancedRegisterSales = withFormik({
	mapPropsToValues: (props) => {
		return {
			customer: '-1',
			date: '',
			amount: '',
			invoiceNumber: '',
			installments: [defaultInstallment],
			filenameInvoice: '',
			filenameInvoiceOriginal: '',
			filenameExcel: '',
			filenameExcelOriginal: '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting, setStatus}) => {
		if (checkAmountValidation(values)) {
			const data = stringToNumber(values);
			await registerInvoice(data);
			setSubmitting(true);
			history.push({
				pathname: '/partner-dashboard',
				from: '/register-sales',
			});
		} else {
			setSubmitting(false);
			setStatus({
				submitTried: true
			});
		}
	},
	enableReinitialize: true
})(RegisterSales);

const mapStateToProps = (state) => ({
	partnerCustomers: getPartnerCustomers(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadPartnerCustomers: loadPartnerCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnhancedRegisterSales);
