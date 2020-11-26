import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {saveStepTwoAction} from "../../redux/actions/customer";
import {decodeToken} from "../../common";
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";
import {loadCustomerMain} from "../../redux/actions/common";
import {getCustomerMain} from "../../redux/selectors/common";

const defaultAsset = {
	name: '',
	value: '',
	detail: ''
};

const formSchema = Yup.object().shape({
	requestedCredit: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	lastSales: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	currentSales: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	lastCostGoods: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	currentCostGoods: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	lastCostStaff: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	currentCostStaff: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	lastCostOther: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	currentCostOther: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	noLoans: Yup.bool(),
	loans: Yup.array()
		.when('noLoans', {
			is: (noLoans) => !noLoans,
			then: Yup.array()
				.of(
					Yup.object().shape({
						name: Yup.string()
							.required('Required'),
						value: Yup.string()
							.test(
								'is-decimal',
								'You must enter a valid number',
								value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
							)
							.typeError('You must enter a valid number')
							.required('Required'),
						detail: Yup.string()
					}),
				),
		}),
	noAssets: Yup.bool(),
	assets: Yup.array()
		.when('noAssets', {
			is: (noAssets) => !noAssets,
			then: Yup.array()
				.of(
					Yup.object().shape({
						name: Yup.string()
							.required('Required'),
						value: Yup.string()
							.test(
								'is-decimal',
								'You must enter a valid number',
								value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
							)
							.typeError('You must enter a valid number')
							.required('Required'),
						detail: Yup.string()
					}),
				),
		}),
});

class Step2 extends Component {
	componentDidMount() {
		const detail = decodeToken();
		if (detail && detail.customer && detail.customer.id) {
			const {loadCustomerMain} = this.props;
			loadCustomerMain(detail.customer.id);
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
		temp.push(defaultAsset);

		setFieldValue(key, temp);
	};

	deleteArrayProperty = (key, index) => {
		const {values, setFieldValue} = this.props;

		const data = values[key];
		let temp = JSON.parse(JSON.stringify(data));
		temp.splice(index, 1);

		setFieldValue(key, temp);
	};

	render() {
		const {
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
			customerMain,
		} = this.props;

		const lastResult = () => {
			const lastSalesValue = parseFloat(values['lastSales']) || 0;
			const lastCostGoodsValue = parseFloat(values['lastCostGoods']) || 0;
			const lastCostStaffValue = parseFloat(values['lastCostStaff']) || 0;
			const lastCostOtherValue = parseFloat(values['lastCostOther']) || 0;

			return (lastSalesValue - lastCostGoodsValue - lastCostStaffValue - lastCostOtherValue);
		};

		const currentResult = () => {
			const currentSalesValue = parseFloat(values['currentSales']) || 0;
			const currentCostGoodsValue = parseFloat(values['currentCostGoods']) || 0;
			const currentCostStaffValue = parseFloat(values['currentCostStaff']) || 0;
			const currentCostOtherValue = parseFloat(values['currentCostOther']) || 0;

			return (currentSalesValue - currentCostGoodsValue - currentCostStaffValue - currentCostOtherValue);
		};

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<CustomerNotActivatedHeader/>
				<PageTitle title={''}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title">
											Step 2 of 5 - Financial Info
										</h4>
									</div>
									<div className="card-body">
										<Form className="personal_validate">
											<div className="form-row">
												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Suggested Credit</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<label className='mr-sm-2 mt-2'>{customerMain && customerMain.suggestedCredit} TZS</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Annual Purchases</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<label className='mr-sm-2 mt-2'>{customerMain && customerMain.annualSales} TZS</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Requested Credit*</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<input
																type="number"
																placeholder="Requested Credit in TZS"
																name="requestedCredit"
																className={`form-control text-right ${errors.requestedCredit && touched.requestedCredit && 'is-invalid'}`}
																value={values["requestedCredit"]}
																onChange={(e) => setFieldValue('requestedCredit', parseFloat(e.target.value))}
															/>
															{errors.requestedCredit && touched.requestedCredit ?
																<div className="invalid-feedback">{errors.requestedCredit}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-xl-4 col-sm-6">
															<label className='mr-sm-2 mt-2'>Last 3 Months</label>
														</div>
														<div className="col-xl-6 col-sm-6">
															<label className='mr-sm-2 mt-2'>{customerMain && customerMain.last3Months} TZS</label>
														</div>
													</div>
												</div>
											</div>

											<div className="form-row mt-5 mb-5">
												<div className="form-group col-xl-12">
													<div className="transaction-table">
														<div className="table-responsive">
															<table className="table mb-0 table-responsive-sm table-borderless">
																<thead>
																<tr>
																	<td className="pt-0 pb-0">
																		<label/>
																	</td>
																	<td className="pt-0 pb-0">
																		<label>Last Year</label>
																	</td>
																	<td className="pt-0 pb-0">
																		<label>Current Year(Forecast)</label>
																	</td>
																</tr>
																</thead>

																<tbody>
																<tr>
																	<td className="pt-2 pb-2">
																		<label className="mr-sm-2 mt-2">Annual Sales</label>
																	</td>

																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="lastSales"
																			className={`form-control text-right ${errors.lastSales && touched.lastSales && 'is-invalid'}`}
																			value={values["lastSales"]}
																			onChange={(e) => setFieldValue('lastSales', parseFloat(e.target.value))}
																		/>
																		{errors.lastSales && touched.lastSales ?
																			<div className="invalid-feedback">{errors.lastSales}</div> : null}
																	</td>

																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="currentSales"
																			className={`form-control text-right ${errors.currentSales && touched.currentSales && 'is-invalid'}`}
																			value={values["currentSales"]}
																			onChange={(e) => setFieldValue('currentSales', parseFloat(e.target.value))}
																		/>
																		{errors.currentSales && touched.currentSales ?
																			<div className="invalid-feedback">{errors.currentSales}</div> : null}
																	</td>
																</tr>

																<tr>
																	<td className="pt-2 pb-2">
																		<label className="mr-sm-2 mt-2">Annual Cost of Goods</label>
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="lastCostGoods"
																			className={`form-control text-right ${errors.lastCostGoods && touched.lastCostGoods && 'is-invalid'}`}
																			value={values["lastCostGoods"]}
																			onChange={(e) => setFieldValue('lastCostGoods', parseFloat(e.target.value))}
																		/>
																		{errors.lastCostGoods && touched.lastCostGoods ?
																			<div className="invalid-feedback">{errors.lastCostGoods}</div> : null}
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="currentCostGoods"
																			className={`form-control text-right ${errors.currentCostGoods && touched.currentCostGoods && 'is-invalid'}`}
																			value={values["currentCostGoods"]}
																			onChange={(e) => setFieldValue('currentCostGoods', parseFloat(e.target.value))}
																		/>
																		{errors.currentCostGoods && touched.currentCostGoods ?
																			<div className="invalid-feedback">{errors.currentCostGoods}</div> : null}
																	</td>
																</tr>

																<tr>
																	<td className="pt-2 pb-2">
																		<label className="mr-sm-2 mt-2">Annual Cost of Staff</label>
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="lastCostStaff"
																			className={`form-control text-right ${errors.lastCostStaff && touched.lastCostStaff && 'is-invalid'}`}
																			value={values["lastCostStaff"]}
																			onChange={(e) => setFieldValue('lastCostStaff', parseFloat(e.target.value))}
																		/>
																		{errors.lastCostStaff && touched.lastCostStaff ?
																			<div className="invalid-feedback">{errors.lastCostStaff}</div> : null}
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="currentCostStaff"
																			className={`form-control text-right ${errors.currentCostStaff && touched.currentCostStaff && 'is-invalid'}`}
																			value={values["currentCostStaff"]}
																			onChange={(e) => setFieldValue('currentCostStaff', parseFloat(e.target.value))}
																		/>
																		{errors.currentCostStaff && touched.currentCostStaff ?
																			<div className="invalid-feedback">{errors.currentCostStaff}</div> : null}
																	</td>
																</tr>

																<tr>
																	<td className="pt-2 pb-2">
																		<label className="mr-sm-2 mt-2">Annual Cost of Other</label>
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="lastCostOther"
																			className={`form-control text-right ${errors.lastCostOther && touched.lastCostOther && 'is-invalid'}`}
																			value={values["lastCostOther"]}
																			onChange={(e) => setFieldValue('lastCostOther', parseFloat(e.target.value))}
																		/>
																		{errors.lastCostOther && touched.lastCostOther ?
																			<div className="invalid-feedback">{errors.lastCostOther}</div> : null}
																	</td>
																	<td className="pt-2 pb-2">
																		<input
																			type="number"
																			placeholder=""
																			name="currentCostOther"
																			className={`form-control text-right ${errors.currentCostOther && touched.currentCostOther && 'is-invalid'}`}
																			value={values["currentCostOther"]}
																			onChange={(e) => setFieldValue('currentCostOther', parseFloat(e.target.value))}
																		/>
																		{errors.currentCostOther && touched.currentCostOther ?
																			<div className="invalid-feedback">{errors.currentCostOther}</div> : null}
																	</td>
																</tr>

																<tr>
																	<td className="pt-2 pb-2">
																		<label>Annual Result</label>
																	</td>
																	<td className="pt-2 pb-2 text-right">
																		<label>{lastResult()} TZS</label>
																	</td>
																	<td className="pt-2 pb-2 text-right">
																		<label>{currentResult()} TZS</label>
																	</td>
																</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>

											<div className="form-row">
												<div className="form-group col-xl-12 mb-0">
													<div className="row">
														<div className="col-xl-12">
															<label className="mr-sm-2 mt-2">Company Assets</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-12 mb-0">
													<div className="row">
														<div className="col-xl-12">
															<label className="toggle">
																<input
																	className="toggle-checkbox"
																	type="checkbox"
																	checked={values.noAssets}
																	onChange={(e) => setFieldValue('noAssets', e.target.checked)}
																/>
																<div className="toggle-switch"/>
																<span className="toggle-label">No Assets</span>
															</label>
														</div>
													</div>
												</div>

												{
													!values.noAssets && (
														<div className="form-group col-xl-12">
															<div className="transaction-table">
																<div className="table-responsive">
																	<table className="table mb-0 table-responsive-sm table-borderless">
																		<thead>
																		<tr>
																			<td className="pt-0 pb-0">
																				<label>
																					Asset
																				</label>
																			</td>
																			<td className="pt-0 pb-0">
																				<label>
																					Value
																				</label>
																			</td>
																			<td className="pt-0 pb-0">
																				<label>
																					Details
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
																			values.assets && values.assets.map((item, key) => {
																				return (
																					<tr key={`asset${key}`}>
																						<td className="pt-0 pb-1">
																							<input
																								type="text"
																								placeholder="Asset"
																								value={values["assets"][key].name}
																								className={`form-control`}
																								onChange={(e) => setFieldValue(`assets[${key}].name`, e.target.value)}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							<input
																								type="number"
																								placeholder="TSZ"
																								className={`form-control text-right`}
																								value={values["assets"][key].value}
																								onChange={(e) => setFieldValue(`assets[${key}].value`, parseFloat(e.target.value))}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							<input
																								type="text"
																								placeholder="Enter details about Asset"
																								className={`form-control`}
																								value={values["assets"][key].detail}
																								onChange={(e) => setFieldValue(`assets[${key}].detail`, e.target.value)}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							{
																								(key !== 0) && (
																									<span
																										className={'large-round-icon bg-danger'}
																										onClick={() => this.deleteArrayProperty('assets', key)}
																									>
																										<i className="fa fa-close"/>
																									</span>
																								)
																							}
																						</td>
																						<td className="pt-0 pb-1">
																							{
																								(key === (values.assets.length - 1)) && (
																									<span
																										className={'large-round-icon bg-primary'}
																										onClick={() => this.addArrayProperty('assets')}
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
																	{errors.assets && touched.assets ?
																		<div className="invalid-feedback"
																				 style={{display: 'block'}}>Not Valid</div> : null}
																</div>
															</div>
														</div>
													)
												}
											</div>

											<div className="form-row mt-5 mb-5">
												<div className="form-group col-xl-12 mb-0">
													<div className="row">
														<div className="col-xl-12">
															<label className="mr-sm-2 mt-2">Company Loans</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-12 mb-0">
													<div className="row">
														<div className="col-xl-12">
															<label className="toggle">
																<input
																	className="toggle-checkbox"
																	type="checkbox"
																	checked={values.noLoans}
																	onChange={(e) => setFieldValue('noLoans', e.target.checked)}
																/>
																<div className="toggle-switch"/>
																<span className="toggle-label">No Loans</span>
															</label>
														</div>
													</div>
												</div>

												{
													!values.noLoans && (
														<div className="form-group col-xl-12">
															<div className="transaction-table">
																<div className="table-responsive">
																	<table className="table mb-0 table-responsive-sm table-borderless">
																		<thead>
																		<tr>
																			<td className="pt-0 pb-0">
																				<label>
																					Loan Type
																				</label>
																			</td>
																			<td className="pt-0 pb-0">
																				<label>
																					Current Value
																				</label>
																			</td>
																			<td className="pt-0 pb-0">
																				<label>
																					Lender and Details
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
																			values.loans && values.loans.map((item, key) => {
																				return (
																					<tr key={`loan${key}`}>
																						<td className="pt-0 pb-1">
																							<input
																								type="text"
																								placeholder="Loan"
																								className={`form-control`}
																								value={values.loans[key].name}
																								onChange={(e) => setFieldValue(`loans[${key}].name`, e.target.value)}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							<input
																								type="number"
																								placeholder="TSZ"
																								className={`form-control text-right`}
																								value={values.loans[key].value}
																								onChange={(e) => setFieldValue(`loans[${key}].value`, parseFloat(e.target.value))}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							<input
																								type="text"
																								placeholder="Enter details about Loan"
																								className={`form-control`}
																								value={values.loans[key].detail}
																								onChange={(e) => setFieldValue(`loans[${key}].detail`, e.target.value)}
																							/>
																						</td>
																						<td className="pt-0 pb-1">
																							{
																								(key !== 0) && (
																									<span
																										className={'large-round-icon bg-danger'}
																										onClick={() => this.deleteArrayProperty('loans', key)}
																									>
																										<i className="fa fa-close"/>
																									</span>
																								)
																							}
																						</td>
																						<td className="pt-0 pb-1">
																							{
																								(key === (values.loans.length - 1)) && (
																									<span
																										className={'large-round-icon bg-primary'}
																										onClick={() => this.addArrayProperty('loans')}
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
																	{errors.loans && touched.loans ?
																		<div className="invalid-feedback"
																				 style={{display: 'block'}}>No Valid</div> : null}
																</div>
															</div>
														</div>
													)
												}
											</div>

											<div className="form-row">
												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5 mr-2 mb-2" type="button"
																	onClick={() => this.navigateTo('customer-step1')}>GO BACK
													</button>
													<button className="btn btn-primary pl-5 pr-5 mb-2" type="submit">NEXT STEP</button>
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

const EnhancedStep2 = withFormik({
	mapPropsToValues: (props) => {
		const data = props.customerMain;

		return {
			requestedCredit: (data && data.requestedCredit && parseFloat(data.requestedCredit)) || '',
			lastSales: (data && data.lastSales && parseFloat(data.lastSales)) || '',
			currentSales: (data && data.currentSales && parseFloat(data.currentSales)) || '',
			lastCostGoods: (data && data.lastCostGoods && parseFloat(data.lastCostGoods)) || '',
			currentCostGoods: (data && data.currentCostGoods && parseFloat(data.currentCostGoods)) || '',
			lastCostStaff: (data && data.lastCostStaff && parseFloat(data.lastCostStaff)) || '',
			currentCostStaff: (data && data.currentCostStaff && parseFloat(data.currentCostStaff)) || '',
			lastCostOther: (data && data.lastCostOther && parseFloat(data.lastCostOther)) || '',
			currentCostOther: (data && data.currentCostOther && parseFloat(data.currentCostOther)) || '',
			noAssets: false,
			assets: (data && data.assets && data.assets.length > 0) ? data.assets : [defaultAsset],
			noLoans: false,
			loans: (data && data.loans && data.loans.length > 0) ? data.loans : [defaultAsset],
		}
	},
	validationSchema: formSchema,
	handleSubmit: (
		values, {props, setSubmitting}) => {
		const temp = JSON.parse(JSON.stringify(values));
		if (temp.noAssets) {
			delete temp['assets'];
		}
		if (temp.noLoans) {
			delete temp['loans'];
		}
		const userDetails = decodeToken();
		if (userDetails && userDetails.customer && userDetails.customer.id) {
			const customerId = userDetails.customer.id;
			const {saveStepTwo} = props;
			saveStepTwo(customerId, temp);
		}
	},
	enableReinitialize: true
})(Step2);

const mapStateToProps = (state) => ({
	customerMain: getCustomerMain(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
			saveStepTwo: saveStepTwoAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnhancedStep2);
