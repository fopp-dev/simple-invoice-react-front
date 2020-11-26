import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {bindActionCreators} from "redux";
import {saveStepOneAction} from "../../redux/actions/customer";
import {decodeToken} from "../../common";
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";
import {loadCustomerMain} from "../../redux/actions/common";
import {getCustomerMain} from "../../redux/selectors/common";

const formSchema = Yup.object().shape({
	registeredName: Yup.string()
		.required('Required'),
	registrationNumber: Yup.number()
		.typeError('Number is not valid')
		.required('Required'),
	tinNumber: Yup.number()
		.typeError('Number is not valid')
		.required('Required'),
	vatNumber: Yup.number()
		.typeError('Number is not valid'),
	cityArea: Yup.string()
		.required('Required'),
	street: Yup.string()
		.required('Required'),
	blockNumber: Yup.number()
		.typeError('Number is not valid'),
	plotNumber: Yup.number()
		.typeError('Number is not valid'),
	companyPhone: Yup.string(),
	companyEmail: Yup.string()
		.email('Email is not valid')
		.nullable(),
	homepage: Yup.string()
		.url('Url is not valid')
		.nullable(),
});

class Step1 extends Component {
	componentDidMount() {
		const userDetail = decodeToken();
		if (userDetail && userDetail.customer && userDetail.customer.id) {
			const {loadCustomerMain} = this.props;
			loadCustomerMain(userDetail.customer.id);
		}
	}

	render() {
		const {
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
		} = this.props;
		const userDetail = decodeToken();
		const tradingName = (userDetail && userDetail.customer && userDetail.customer.tradingName) || '';

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<CustomerNotActivatedHeader/>
				<PageTitle title={`Welcome ${tradingName}`}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title">
											Step 1 of 5 - Company Info
										</h4>
									</div>
									<div className="card-body">
										<Form className="personal_validate">
											<div className="form-row">
												<div className="col-xl-6">
													<div className="form-group row">
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Registered Name</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																className={`form-control ${errors.registeredName && touched.registeredName && 'is-invalid'}`}
																placeholder="Company Registered Name"
																name="registeredName"
																value={values['registeredName']}
																onChange={(e) => setFieldValue('registeredName', e.target.value)}
															/>
															{errors.registeredName && touched.registeredName ?
																<div className="invalid-feedback">{errors.registeredName}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Registration Number</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="number"
																placeholder="234567890"
																name="registrationNumber"
																className={`form-control ${errors.registrationNumber && touched.registrationNumber && 'is-invalid'}`}
																value={values["registrationNumber"]}
																onChange={(e) => setFieldValue('registrationNumber', (e.target.value))}
															/>
															{errors.registrationNumber && touched.registrationNumber ?
																<div className="invalid-feedback">{errors.registrationNumber}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">TIN Number</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="number"
																placeholder="Tax Payers Identification Number"
																name="tinNumber"
																className={`form-control ${errors.tinNumber && touched.tinNumber && 'is-invalid'}`}
																value={values["tinNumber"]}
																onChange={(e) => setFieldValue('tinNumber', (e.target.value))}
															/>
															{errors.tinNumber && touched.tinNumber ?
																<div className="invalid-feedback">{errors.tinNumber}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">VAT Number</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="number"
																placeholder="234567890"
																name="vatNumber"
																className={`form-control ${errors.vatNumber && touched.vatNumber && 'is-invalid'}`}
																value={values["vatNumber"]}
																onChange={(e) => setFieldValue('vatNumber', (e.target.value))}
															/>
															{errors.vatNumber && touched.vatNumber ?
																<div className="invalid-feedback">{errors.vatNumber}</div> : null}
														</div>
													</div>
												</div>

												<div className="col-xl-6">
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">City Area</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																className={`form-control ${errors.cityArea && touched.cityArea && 'is-invalid'}`}
																placeholder=""
																name="cityArea"
																value={values["cityArea"]}
																onChange={(e) => setFieldValue('cityArea', e.target.value)}
															/>
															{errors.cityArea && touched.cityArea ?
																<div className="invalid-feedback">{errors.cityArea}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Street</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																placeholder=""
																name="street"
																className={`form-control ${errors.street && touched.street && 'is-invalid'}`}
																value={values["street"]}
																onChange={(e) => setFieldValue('street', e.target.value)}
															/>
															{errors.street && touched.street ?
																<div className="invalid-feedback">{errors.street}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Block Number</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="number"
																placeholder=""
																name="blockNumber"
																className={`form-control ${errors.blockNumber && touched.blockNumber && 'is-invalid'}`}
																value={values["blockNumber"]}
																onChange={(e) => setFieldValue('blockNumber', (e.target.value))}
															/>
															{errors.blockNumber && touched.blockNumber ?
																<div className="invalid-feedback">{errors.blockNumber}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Plot Number</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="number"
																placeholder=""
																name="plotNumber"
																className={`form-control ${errors.plotNumber && touched.plotNumber && 'is-invalid'}`}
																value={values["plotNumber"]}
																onChange={(e) => setFieldValue('plotNumber', (e.target.value))}
															/>
															{errors.plotNumber && touched.plotNumber ?
																<div className="invalid-feedback">{errors.plotNumber}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Company Phone</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																placeholder=""
																name="companyPhone"
																className={`form-control ${errors.companyPhone && touched.companyPhone && 'is-invalid'}`}
																value={values["companyPhone"]}
																onChange={(e) => setFieldValue('companyPhone', e.target.value)}
															/>
															{errors.companyPhone && touched.companyPhone ?
																<div className="invalid-feedback">{errors.companyPhone}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Company Email</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																placeholder=""
																name="companyEmail"
																className={`form-control ${errors.companyEmail && touched.companyEmail && 'is-invalid'}`}
																value={values["companyEmail"]}
																onChange={(e) => setFieldValue('companyEmail', e.target.value)}
															/>
															{errors.companyEmail && touched.companyEmail ?
																<div className="invalid-feedback">{errors.companyEmail}</div> : null}
														</div>
													</div>
													<div className="form-group row">
														<div className="col-xl-1">

														</div>
														<div className="col-xl-3 col-md-4">
															<label className="mr-sm-2 mt-2">Homepage</label>
														</div>
														<div className="col-xl-8 col-md-8">
															<input
																type="text"
																placeholder=""
																name="homepage"
																className={`form-control ${errors.homepage && touched.homepage && 'is-invalid'}`}
																value={values["homepage"]}
																onChange={(e) => setFieldValue('homepage', e.target.value)}
															/>
															{errors.homepage && touched.homepage ?
																<div className="invalid-feedback">{errors.homepage}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5" type="submit">Next Step</button>
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

const emptyToNull = (obj) => {
	const temp = JSON.parse(JSON.stringify(obj));
	const keys = Object.keys(temp);

	keys && keys.map(key => {
		if (typeof temp[key] === 'string') {
			if (!temp[key] || (temp[key] && temp[key].trim() === '')) {
				delete temp[key];
			}
		}
	});

	return temp;
};

const EnhancedStep1 = withFormik({
	mapPropsToValues: (props) => {
		const data = props.customerMain;
		return {
			registeredName:  (data && data.registeredName) || '',
			registrationNumber: (data && data.registrationNumber) || '',
			tinNumber: (data && data.tinNumber) || '',
			vatNumber: (data && data.vatNumber) || '',
			cityArea: (data && data.cityArea) || '',
			street: (data && data.street) || '',
			blockNumber: (data && data.blockNumber) || '',
			plotNumber: (data && data.plotNumber) || '',
			companyPhone: (data && data.companyPhone) || '',
			companyEmail: (data && data.companyEmail) || '',
			homepage: (data && data.homepage) || '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: (
		values, {props, setSubmitting}) => {
		const userDetails = decodeToken();

		if (userDetails && userDetails.customer && userDetails.customer.id) {
			const customerId = userDetails.customer.id;
			const {saveStepOne} = props;
			const data = emptyToNull(values);
			saveStepOne(customerId, data);
		}
	},
	enableReinitialize: true
})(Step1);

const mapStateToProps = (state) => ({
	customerMain: getCustomerMain(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
			saveStepOne: saveStepOneAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnhancedStep1);
