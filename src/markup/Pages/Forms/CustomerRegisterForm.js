import React, {Component} from 'react';
import {Form, withFormik} from "formik";
import {registerCustomer} from "../../../http/http-calls";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Yup from "yup";
import {loadCustomerMain} from "../../../redux/actions/common";
import {getCustomerMain} from "../../../redux/selectors/common";

const formSchema = Yup.object().shape({
	tradingName: Yup.string()
		.required('Required'),
	startYear: Yup.number()
		.test(
			'is-year',
			'Year is not correct',
			value => {
				if (value < 1000 || value > new Date().getFullYear()) {
					return false;
				}
				return true;
			}
		)
		.typeError('Year is not correct')
		.required('Required'),
	startMonth: Yup.number()
		.test(
			'is-month',
			'Month is not correct',
			value => {
				if (value < 1 || value > 12) {
					return false;
				}
				return true;
			}
		)
		.typeError('Month is not correct')
		.required('Required'),
	customerNumber: Yup.string()
		.required('Required'),
	annualSales: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	last3Months: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.required('Required')
		.typeError('You must enter a valid number'),
	name: Yup.string()
		.required('Required'),
	contactEmail: Yup.string()
		.email('Email is not valid')
		.required('Required'),
	suggestedCredit: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
});

class CustomerRegisterForm extends Component {
	componentDidMount() {
		const {
			id,
			loadCustomerMain,
			customerMain,
		} = this.props;

		if (id) {
			loadCustomerMain(id);
			this.initializeForm(customerMain);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			id,
			customerMain,
		} = this.props;

		if (prevProps.customerMain !== customerMain && customerMain) {
			if (id) {
				this.initializeForm(customerMain);
			}
		}
	}

	initializeForm = (data) => {
		const {setFieldValue} = this.props;
		setFieldValue('tradingName', (data && data.tradingName) || '');
		setFieldValue('startYear', (data && data.startYear) || '');
		setFieldValue('startMonth', (data && data.startMonth) || '');
		setFieldValue('customerNumber', (data && data.customerNumber) || '');
		setFieldValue('annualSales', (data && data.annualSales) || '');
		setFieldValue('last3Months', (data && data.last3Months) || '');
		setFieldValue('name', (data && data.users && data.users[0].name) || '');
		setFieldValue('contactEmail', (data && data.users && data.users[0].email) || '');
		setFieldValue('suggestedCredit', (data && data.suggestedCredit) || '');
	};

	render() {
		const {values, errors, touched, setFieldValue, disabled} = this.props;

		return (
			<Form className="personal_validate w-100">
				<div className="form-row">
					<div className="col-xl-6">
						<div className="row form-group">
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Trading Name</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="text"
									className={`form-control ${errors.tradingName && touched.tradingName && 'is-invalid'}`}
									placeholder="ABC Reseller Inc"
									disabled={disabled}
									name="tradingName"
									value={values['tradingName']}
									onChange={(e) => setFieldValue('tradingName', e.target.value)}
								/>
								{errors.tradingName && touched.tradingName ?
									<div className="invalid-feedback">{errors.tradingName}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Customer Number</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="text"
									placeholder="2345"
									name="customerNumber"
									disabled={disabled}
									className={`form-control ${errors.customerNumber && touched.customerNumber && 'is-invalid'}`}
									value={values["customerNumber"]}
									onChange={(e) => setFieldValue('customerNumber', e.target.value)}
								/>
								{errors.customerNumber && touched.customerNumber ?
									<div className="invalid-feedback">{errors.customerNumber}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Contact Name</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="text"
									placeholder="Michael Denver"
									name="name"
									disabled={disabled}
									className={`form-control ${errors.name && touched.name && 'is-invalid'}`}
									value={values["name"]}
									onChange={(e) => setFieldValue('name', e.target.value)}
								/>
								{errors.name && touched.name ?
									<div className="invalid-feedback">{errors.name}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Contact Email</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="email"
									placeholder="michael.denver@email.com"
									name="contactEmail"
									disabled={disabled}
									className={`form-control ${errors.contactEmail && touched.contactEmail && 'is-invalid'}`}
									value={values["contactEmail"]}
									onChange={(e) => setFieldValue('contactEmail', e.target.value)}
								/>
								{errors.contactEmail && touched.contactEmail ?
									<div className="invalid-feedback">{errors.contactEmail}</div> : null}
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="row form-group">
							<div className="col-xl-1">

							</div>
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Client Since</label>
							</div>
							<div className="col-xl-4 col-md-4">
								<input
									type="number"
									className={`form-control ${errors.startYear && touched.startYear && 'is-invalid'}`}
									placeholder="Year"
									name="startYear"
									disabled={disabled}
									value={values["startYear"]}
									onChange={(e) => setFieldValue('startYear', e.target.value)}
								/>
								{errors.startYear && touched.startYear ?
									<div className="invalid-feedback">{errors.startYear}</div> : null}
							</div>
							<div className="col-xl-4 col-md-4">
								<input
									type="number"
									placeholder="Month"
									name="startMonth"
									disabled={disabled}
									className={`form-control ${errors.startMonth && touched.startMonth && 'is-invalid'}`}
									value={values["startMonth"]}
									onChange={(e) => setFieldValue('startMonth', e.target.value)}
								/>
								{errors.startMonth && touched.startMonth ?
									<div className="invalid-feedback">{errors.startMonth}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-1">

							</div>
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Annual Sales</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="number"
									placeholder="Enter annual sales in TZS"
									name="annualSales"
									disabled={disabled}
									className={`form-control text-right ${errors.annualSales && touched.annualSales && 'is-invalid'}`}
									value={values["annualSales"]}
									onChange={(e) => setFieldValue('annualSales', e.target.value)}
								/>
								{errors.annualSales && touched.annualSales ?
									<div className="invalid-feedback">{errors.annualSales}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-1">

							</div>
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Last 3 Months</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="number"
									placeholder="Enter last 3 month sales in TZS"
									name="last3Months"
									disabled={disabled}
									className={`form-control text-right ${errors.last3Months && touched.last3Months && 'is-invalid'}`}
									value={values["last3Months"]}
									onChange={(e) => setFieldValue('last3Months', e.target.value)}
								/>
								{errors.last3Months && touched.last3Months ?
									<div className="invalid-feedback">{errors.last3Months}</div> : null}
							</div>
						</div>
						<div className="row form-group">
							<div className="col-xl-1">

							</div>
							<div className="col-xl-3 col-md-4">
								<label className="mr-sm-2 mt-2">Suggested Credit</label>
							</div>
							<div className="col-xl-8 col-md-8">
								<input
									type="number"
									placeholder="Enter suggested credit line in TZS"
									name="suggestedCredit"
									disabled={disabled}
									className={`form-control text-right ${errors.suggestedCredit && touched.suggestedCredit && 'is-invalid'}`}
									value={values["suggestedCredit"]}
									onChange={(e) => setFieldValue('suggestedCredit', e.target.value)}
								/>
								{errors.suggestedCredit && touched.suggestedCredit ?
									<div className="invalid-feedback">{errors.suggestedCredit}</div> : null}
							</div>
						</div>
					</div>

					<div className="form-group col-12 text-center">
						{
							!disabled &&
							<button className="btn btn-success pl-5 pr-5" type="submit">Save</button>
						}
					</div>
				</div>
			</Form>
		)
	}
}

const EnhancedCustomerRegisterForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			tradingName: '',
			startYear: '',
			startMonth: '',
			customerNumber: '',
			annualSales: '',
			last3Months: '',
			name: '',
			contactEmail: '',
			suggestedCredit: '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props}) => {
		const {changeState} = props;
		const data = {
			...values,
			startYear: parseInt(values['startYear']),
			startMonth: parseInt(values['startMonth']),
			annualSales: parseFloat(values['annualSales']),
			last3Months: parseFloat(values['last3Months']),
			suggestedCredit: parseFloat(values['suggestedCredit']),
		}

		try {
			await registerCustomer(data);
			changeState(false, 'isSubmitting');
			changeState(true, 'success');
		} catch (e) {
			changeState(false, 'isSubmitting');
		}
	},
	enableReinitialize: true
})(CustomerRegisterForm);

const mapStateToProps = (state) => ({
	customerMain: getCustomerMain(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedCustomerRegisterForm);
