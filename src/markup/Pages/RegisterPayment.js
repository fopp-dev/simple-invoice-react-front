import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import history from "../../history";
import PartnerHeader from "../Layout/PartnerHeader";
import {loadPartnerCustomersAction} from "../../redux/actions/partner";
import {getPartnerCustomers} from "../../redux/selectors/partner";
import {CUSTOMER_APPLICATION_STATUS} from "../../constants";
import {loadInstallmentsNotFullyPaidAction} from "../../redux/actions/customer";
import {getInstallmentsNotFullyPaid} from "../../redux/selectors/customer";
import get from 'lodash/get';
import * as moment from 'moment';
import {registerPayment} from "../../http/http-calls";
import {decodeToken} from "../../common";

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
	account: Yup.string()
		.test(
			'is-valid',
			'Select Account',
			value => value !== '-1'
		)
		.typeError('Select Customer'),
	paymentInstallments: Yup.array()
		.of(
			Yup.object().shape({
				invoiceInstallment: Yup.number()
					.required('Required'),
				amount: Yup.string()
					.test(
						'is-decimal',
						'You must enter a valid number',
						value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
					)
					.typeError('You must enter a valid number')
					.required('Required')
			})
		)
});

const aggregateInstallments = (installmentsNotFullyPaid) => {
	// make array with installment
	let totalInstallments = [];
	installmentsNotFullyPaid && installmentsNotFullyPaid.map(invoice => {
		totalInstallments.push(...invoice.installments);
	});

	totalInstallments && totalInstallments.sort((a, b) => {
		if (moment(a.date).isAfter(b.date)) {
			return 1;
		} else {
			return -1;
		}
	});

	return totalInstallments;
}

class RegisterPayment extends Component {
	state = {
		paymentInstallments: [],
	}

	componentDidMount() {
		const {
			loadPartnerCustomers,
			match,
		} = this.props;

		const userDetails = decodeToken();

		if (match.params.id) {
			this.onChangeCustomer({target: {value: match.params.id}});
		}

		if (userDetails && userDetails.partner && userDetails.partner.id) {
			loadPartnerCustomers(userDetails.partner.id);
		}
	}

	filterCustomers = () => {
		const {partnerCustomers} = this.props;

		return partnerCustomers && partnerCustomers.filter(customer => {
			const completedSteps = customer.logs && customer.logs.filter(log => log.status === CUSTOMER_APPLICATION_STATUS.COMPLETED);
			return completedSteps.length === 5;
		});
	}

	onChangeCustomer = (e) => {
		const {
			setFieldValue,
			loadInstallmentsNotFullyPaid,
		} = this.props;

		setFieldValue('customer', e.target.value);

		if (e.target.value !== '-1') {
			loadInstallmentsNotFullyPaid(e.target.value);
		}
	}

	// process when input the amount and blur on input
	autoFill = () => {
		const {
			values,
			setFieldValue,
		} = this.props;
		let amount = parseFloat(values['amount']);
		const installments = aggregateInstallments(this.props.installmentsNotFullyPaid);

		if (installments) {
			let tempForPaymentInstallments = [];
			// initialize the payment installments
			setFieldValue('paymentInstallments', []);
			for (let i = 0; i < installments.length; i++) {
				if (amount > installments[i].remaining) {
					// autofill as installment remaining amount
					tempForPaymentInstallments.push({
						invoiceInstallment: installments[i].id,
						amount: (installments[i].remaining),
					});
					amount -= (installments[i].remaining);
				} else {
					// autofill as remaining payment amount
					tempForPaymentInstallments.push({
						invoiceInstallment: installments[i].id,
						amount: amount.toFixed(2),
					})
					amount = 0;
					break;
				}
			}

			setFieldValue('paymentInstallments', tempForPaymentInstallments);
		}
	}

	// when user inputs the payment installment
	changePaymentInstallment = (installmentId, amount) => {
		const {
			values,
			setFieldValue,
		} = this.props;
		const paymentInstallments = values['paymentInstallments'];
		const index = paymentInstallments && paymentInstallments.findIndex(item => item['invoiceInstallment'] === installmentId);
		const temp = paymentInstallments && JSON.parse(JSON.stringify(paymentInstallments));

		// if user makes amount to 0 or blank
		if (!amount) {
			temp.splice(index, 1);
		} else {
			if (index !== -1) {
				temp[index]['amount'] = amount;
			} else {
				temp.push({
					invoiceInstallment: installmentId,
					amount: amount,
				});
			}
		}

		setFieldValue('paymentInstallments', temp);
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
		const paymentInstallments = values['paymentInstallments'];
		const completedCustomers = this.filterCustomers();
		const installments = aggregateInstallments(this.props.installmentsNotFullyPaid);
		const sumValidationFail = status && status.sumValidationFail;
		const paymentInstallmentAmountValid = status && status.paymentInstallmentAmountInvalid;
		const selectedCustomer = completedCustomers && completedCustomers.find(item => item.id == values['customer']);

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<PartnerHeader/>
				<PageTitle title='Register Customer Payment (Payments - Weekly)'/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-body">
										<Form className="personal_validate">
											<div className="form-row">
												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Customer*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type='text'
																className={`form-control ${errors.customer && touched.customer && 'is-invalid'}`}
																value={(selectedCustomer && selectedCustomer.tradingName) || ''}
																disabled={true}
															/>
															{/*<select
																className={`form-control ${errors.customer && touched.customer && 'is-invalid'}`}
																value={values['customer']}
																name='customer'
																onChange={this.onChangeCustomer}
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
															<label className='mr-sm-2 mt-2'>Payment Date*</label>
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
																className={`form-control text-right ${errors.amount && touched.amount && 'is-invalid'}`}
																value={values["amount"]}
																onBlur={this.autoFill}
																onChange={(e) => setFieldValue('amount', (e.target.value))}
															/>
															{errors.amount && touched.amount ?
																<div className="invalid-feedback">{errors.amount}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Account*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<select
																className={`form-control ${errors.account && touched.account && 'is-invalid'}`}
																name='account'
																onChange={(e) => setFieldValue('account', e.target.value)}
															>
																<option id='-1'>Select Account</option>
																<option id='1'>Cash</option>
																<option id='2'>Bank</option>
															</select>
															{errors.account && touched.account ?
																<div className="invalid-feedback">{errors.account}</div> : null}
														</div>
													</div>
												</div>
											</div>

											<div className="form-row">
												<div className="form-group col-xl-8 mb-0 offset-2">
													<div className="row">
														<div className="col-xl-12">
															<label className="mr-sm-2 mt-2">Installments*</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-8 offset-2">
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
																			Invoice
																		</label>
																	</td>
																	<td className="pt-0 pb-0 text-right">
																		<label>
																			Remaining
																		</label>
																	</td>
																	<td className="pt-0 pb-0 text-right">
																		Paid
																	</td>
																</tr>
																</thead>

																<tbody>
																{
																	installments && installments.length > 0 ?
																		installments.map((installment, key) => {
																			const paymentInstallment = paymentInstallments &&
																				paymentInstallments.find(item => item.invoiceInstallment === installment.id);
																			const amount = (paymentInstallment && paymentInstallment.amount) || '';

																			return (
																				<tr key={`installment-${key}`}>
																					<td className="pt-0 pb-1">
																						<span>{moment(installment.date).format('ll')}</span>
																					</td>
																					<td className="pt-0 pb-1">
																						<span>{installment['invoice'] && installment['invoice']['invoiceNumber']}</span>
																					</td>
																					<td className="pt-0 pb-1 text-right">
																						<span>{installment.remaining}</span>
																					</td>
																					<td className="pt-0 pb-1">
																						<input
																							type='number'
																							className='form-control text-right'
																							value={amount}
																							onChange={(e) => this.changePaymentInstallment(installment.id, e.target.value)}
																						/>
																						{get(errors, `paymentInstallments[${key}].amount`) && get(touched, `paymentInstallments[${key}].amount`) ?
																							<div className="invalid-feedback"
																									 style={{display: 'block'}}>{get(errors, `paymentInstallments[${key}].amount`)}</div> : null}
																					</td>
																				</tr>
																			)
																		}) : (
																			<tr>
																				<td colSpan={5}>
																					No data to display
																				</td>
																			</tr>
																		)
																}
																</tbody>
															</table>

														</div>
													</div>
												</div>
											</div>
											<div className='form-row'>
												{
													sumValidationFail && (
														<div className="col-md-12 invalid-feedback text-center form-group"
																 style={{display: 'block'}}>
															sum of installments are not correct, check and submit again
														</div>
													)
												}
												{
													paymentInstallmentAmountValid && (
														<div className="col-md-12 invalid-feedback text-center form-group"
																 style={{display: 'block'}}>
															amount of payment installment can't be more than remaining amount
														</div>
													)
												}
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

const parseStringToFloat = (values) => {
	values['customer'] = parseInt(values['customer']);
	values['amount'] = parseFloat(values['amount']);
	values['paymentInstallments'] && values['paymentInstallments'].map((installment, key) => {
		values['paymentInstallments'][key]['amount'] = parseFloat(installment.amount);
	});

	return values;
};

/**
 * @description check sum of payment installments are same with amount of payment.
 */
const checkInstallmentsAmount = (values) => {
	const amount = parseFloat(values['amount']);
	let sum = 0;
	values['paymentInstallments'] && values['paymentInstallments'].map(installment => {
		sum += parseFloat(installment.amount);
	});

	return sum === amount;
};

/**
 *@description check payment installment amount is less than remaining
 */
const checkInstallmentIsLessThanRemaining = (values, installments) => {
	for (let i = 0; i < values['paymentInstallments'].length; i++) {
		const item = installments && installments.find(item => item.id === (values['paymentInstallments'][i].invoiceInstallment));

		if (item) {
			if (parseFloat(item.remaining) < values['paymentInstallments'][i].amount) {
				return false;
			}
		} else {
			return false;
		}
	}

	return true;
};

const EnhancedRegisterPayment = withFormik({
	mapPropsToValues: (props) => {
		return {
			customer: '-1',
			date: '',
			amount: '',
			account: '-1',
			paymentInstallments: [],
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting, setStatus}) => {
		const data = parseStringToFloat(values);
		// check if sum of amount of payment installments are same with total amount of payment
		const valid = checkInstallmentsAmount(data);
		const installments = aggregateInstallments(props.installmentsNotFullyPaid);
		// check if payment installment amount is less than installment remaining amount
		const paymentInstallmentAmountValid = checkInstallmentIsLessThanRemaining(data, installments);

		if (!valid) {
			setStatus({sumValidationFail: true});
			setSubmitting(false);
		} else if (!paymentInstallmentAmountValid) {
			setStatus({paymentInstallmentAmountInvalid: true});
			setSubmitting(false);
		} else {
			setStatus({sumValidationFail: false});
			try {
				await registerPayment(data.customer, data);
				setSubmitting(false);
				history.push({
					pathname: '/partner-dashboard',
					from: '/register-payment',
				});
			} catch (e) {
				console.log(e.response.data);
				setSubmitting(false);
			}
		}
	},
	enableReinitialize: true
})(RegisterPayment);

const mapStateToProps = (state) => ({
	partnerCustomers: getPartnerCustomers(state),
	installmentsNotFullyPaid: getInstallmentsNotFullyPaid(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadInstallmentsNotFullyPaid: loadInstallmentsNotFullyPaidAction,
			loadPartnerCustomers: loadPartnerCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnhancedRegisterPayment);
