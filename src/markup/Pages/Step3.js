import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {customerRoles} from "../../constants";
import {bindActionCreators} from "redux";
import {loadCustomerPersonsAction, saveStepThreeAction} from "../../redux/actions/customer";
import {getCustomerPersons} from "../../redux/selectors/customer";
import {decodeToken} from "../../common";
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";

const defaultAsset = {
	name: '',
	value: '',
	detail: ''
};

const defaultPhone = {
	phone: '',
};

const defaultPerson = {
	role: 'Owner',
	ownershipShare: '',
	firstName: '',
	cityArea: '',
	lastName: '',
	street: '',
	nationalId: '',
	blockNumber: '',
	email: '',
	plotNumber: '',
	emergency: '',
	phoneNumbers: [defaultPhone],
	noAssets: false,
	assets: [defaultAsset],
};

const formSchema = Yup.object().shape({
	persons: Yup.array().of(
		Yup.object().shape({
			role: Yup.string().required('Required'),
			ownershipShare: Yup.number()
				.test(
					'is-decimal',
					'Percent is not valid',
					function (value) {
						if (this.parent.role === 'Owner') {
							return value >= 0 && value <= 100;
						} else {
							return true;
						}
					},
				)
				.typeError('You must enter a valid number'),
			firstName: Yup.string()
				.required('Required'),
			cityArea: Yup.string()
				.required('Required'),
			lastName: Yup.string()
				.required('Required'),
			street: Yup.string()
				.required('Required'),
			nationalId: Yup.string()
				.required('Required'),
			blockNumber: Yup.number(),
			plotNumber: Yup.number(),
			email: Yup.string()
				.email('Email is not valid')
				.required('Required'),
			emergency: Yup.string(),
			phoneNumbers: Yup.array()
				.of(
					Yup.object().shape({
						phone: Yup.string()
							.required('Required')
					}),
				),
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
				})
		}).required(),
	)
});

class Step3 extends Component {

	componentDidMount() {
		const {loadCustomerPersons} = this.props;
		const detail = decodeToken();

		if (detail && detail.customer && detail.customer.id) {
			loadCustomerPersons(detail.customer.id);
		}
	}

	addArrayProperty = (personIndex, key) => {
		const {values, setFieldValue} = this.props;

		const data = values['persons'][personIndex][key];
		let temp = JSON.parse(JSON.stringify(data));

		if (key === 'phoneNumbers') {
			temp.push(defaultPhone);
		} else {
			temp.push(defaultAsset);
		}
		setFieldValue(`persons[${personIndex}][${key}]`, temp);
	};

	deleteArrayProperty = (personIndex, key, index) => {
		const {values, setFieldValue} = this.props;

		const data = values['persons'][personIndex][key];
		let temp = JSON.parse(JSON.stringify(data));
		temp.splice(index, 1);

		setFieldValue(`persons[${personIndex}][${key}]`, temp);
	};

	addPerson = () => {
		const {values, setFieldValue} = this.props;
		const data = JSON.parse(JSON.stringify(values['persons']));
		data.splice(0, 0, defaultPerson)
		setFieldValue('persons', data);
	};

	deletePerson = (personIndex) => {
		const {values, setFieldValue} = this.props;
		const data = JSON.parse(JSON.stringify(values['persons']));
		data.splice(personIndex, 1);
		setFieldValue('persons', data);
	};

	navigateTo = (path) => {
		this.props.history.push({
			pathname: path,
			from: '/customer-step2'
		});
	};

	render() {
		const {values, errors, touched, setFieldValue, isSubmitting} = this.props;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<CustomerNotActivatedHeader/>
				<PageTitle title={''}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title" style={{display: 'flex'}}>
											Step 3 of 5 - Persons
										</h4>
									</div>
									<div className="card-body">
										<Form className="personal_validate">
											{
												values && values['persons'] && values['persons'].map((person, personKey) => {
													return (
														<div key={`person${personKey}`}>
															<div className='form-row'>
																<div className='form-group col-xl-12'>
																	<div className='row'>
																		<div className='col-md-12'>
																			<h4 className="card-title" style={{display: 'flex'}}>
																				<span>{person.firstName && person.lastName ? `${person.firstName} ${person.lastName}` : 'New Person'}</span>
																				&nbsp;&nbsp;
																				{
																					values && values['persons'] && values['persons'].length > 1 && (
																						<span
																							className={'round-icon bg-danger'}
																							onClick={() => this.deletePerson(personKey)}
																						>
																						<i className="fa fa-close"/>
																						</span>
																					)}
																				{
																					(personKey === values['persons'].length - 1) && (
																						<span
																							className={'round-icon bg-primary'}
																							onClick={this.addPerson}
																						>
																							<i className="fa fa-plus"/>
																						</span>
																					)
																				}
																			</h4>
																		</div>
																	</div>
																</div>
															</div>
															<div className="form-row">
																<div className="form-group col-xl-12">
																	<div className="row">
																		<div className="col-md-3">
																			<label className="mr-sm-2 mt-2">Role*</label>
																		</div>
																		{
																			customerRoles &&
																			customerRoles.map((item, key) => (
																				<div className="col-md-3" key={key}>
																					<label className="toggle">
																						<input
																							className="toggle-checkbox"
																							type="checkbox"
																							checked={person.role === item}
																							onChange={() => setFieldValue(`persons[${personKey}].role`, item)}
																						/>
																						<div className="toggle-switch"/>
																						<span className="toggle-label">{item}</span>
																					</label>
																				</div>
																			))
																		}
																	</div>
																</div>

																{
																	person.role === 'Owner' && (
																		<>
																			<div className="form-group col-xl-6">
																				<div className="row">
																					<div className="col-xl-3 col-md-4">
																						<label className="mr-sm-2 mt-2">Ownership Share*</label>
																					</div>
																					<div className="col-xl-8 col-md-8">
																						<input
																							type="number"
																							className={`form-control text-right ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].ownershipShare &&
																							touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].ownershipShare && 'is-invalid'}`}
																							placeholder="Ownership in percent"
																							name="ownershipShare"
																							value={person["ownershipShare"]}
																							onChange={(e) => setFieldValue(`persons[${personKey}].ownershipShare`, parseInt(e.target.value))}
																						/>
																						{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].ownershipShare &&
																						touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].ownershipShare ?
																							<div
																								className="invalid-feedback">{errors['persons'][personKey].ownershipShare}</div> : null}
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-6"/>
																		</>
																	)
																}

																<div className="col-xl-6">
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">First Name*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="text"
																				placeholder=""
																				name="firstName"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].firstName &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].firstName && 'is-invalid'}`}
																				value={person["firstName"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].firstName`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].firstName &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].firstName ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].firstName}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Last Name*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="text"
																				placeholder=""
																				name="lastName"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].lastName &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].lastName && 'is-invalid'}`}
																				value={person["lastName"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].lastName`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].lastName &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].lastName ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].lastName}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">National ID*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="number"
																				placeholder=""
																				name="nationalId"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].nationalId &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].nationalId && 'is-invalid'}`}
																				value={person["nationalId"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].nationalId`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].nationalId &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].nationalId ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].nationalId}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Email*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="email"
																				placeholder=""
																				name="email"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].email &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].email && 'is-invalid'}`}
																				value={person["email"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].email`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].email &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].email ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].email}</div> : null}
																		</div>
																	</div>
																</div>

																<div className="col-xl-6">
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">City Area*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="text"
																				placeholder=""
																				name="cityArea"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].cityArea &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].cityArea && 'is-invalid'}`}
																				value={person["cityArea"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].cityArea`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].cityArea &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].cityArea ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].cityArea}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Street*</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="text"
																				placeholder=""
																				name="street"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].street &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].street && 'is-invalid'}`}
																				value={person["street"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].street`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].street &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].street ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].street}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Block Number</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="number"
																				placeholder=""
																				name="blockNumber"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].blockNumber &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].blockNumber && 'is-invalid'}`}
																				value={person["blockNumber"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].blockNumber`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].blockNumber &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].blockNumber ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].blockNumber}</div> : null}
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Plot Number</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<input
																				type="number"
																				placeholder=""
																				name="plotNumber"
																				className={`form-control ${errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].plotNumber &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].plotNumber && 'is-invalid'}`}
																				value={person["plotNumber"]}
																				onChange={(e) => setFieldValue(`persons[${personKey}].plotNumber`, e.target.value)}
																			/>
																			{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].plotNumber &&
																			touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].plotNumber ?
																				<div
																					className="invalid-feedback">{errors['persons'][personKey].plotNumber}</div> : null}
																		</div>
																	</div>
																</div>

																<div className="col-xl-6">
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">Phone Number(s)*</label>
																		</div>
																		<div className='col-xl-9 col-md-8'>
																			{
																				person['phoneNumbers'] && person['phoneNumbers'].map((item, key) => {
																					return (
																						<div className='row mb-2' key={`phone-${personKey}-${key}`}>
																							<div className="col-xl-9 col-md-8">
																								<input
																									type="text"
																									placeholder=""
																									className={`form-control`}
																									value={person.phoneNumbers[key].phone}
																									onChange={(e) => setFieldValue(`persons[${personKey}].phoneNumbers[${key}].phone`, e.target.value)}
																								/>
																							</div>
																							<div className="col-xl-3 col-md-4"
																									 style={{display: 'flex', alignItems: 'center'}}>
																								{
																									((person['phoneNumbers'].length > 1)) && (
																										<span className='round-icon bg-danger'
																													onClick={() => this.deleteArrayProperty(personKey, 'phoneNumbers', key)}>
																							<i className="fa fa-close"/>
																						</span>
																									)
																								}
																								{
																									(key === (person['phoneNumbers'].length - 1)) && (
																										<span className='round-icon bg-primary'
																													onClick={() => this.addArrayProperty(personKey, 'phoneNumbers')}>
																							<i className="fa fa-plus"/>
																						</span>
																									)
																								}
																							</div>
																						</div>
																					)
																				})
																			}

																			<div className='col-md-12'>
																				{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].phoneNumbers &&
																				touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].phoneNumbers ?
																					<div className="invalid-feedback"
																							 style={{display: 'block'}}>Required</div> : null}
																			</div>
																		</div>
																	</div>
																	<div className="form-group row">
																		<div className="col-xl-3 col-md-4">
																			<label className="mr-sm-2 mt-2">In Case of Emergency</label>
																		</div>
																		<div className="col-xl-8 col-md-8">
																			<textarea
																				placeholder="Enter Emergency contact information"
																				rows={6}
																				className={`form-control pt-2 pb-2`}
																				value={person['emergency']}
																				onChange={(e) => setFieldValue(`persons[${personKey}].emergency`, e.target.value)}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															<div className="form-row">
																<div className="form-group col-xl-12 mb-0">
																	<div className="row">
																		<div className="col-xl-12">
																			<label className="mr-sm-2 mt-2">Personal Assets(Cars, Properties, Blank,
																				Accounts)</label>
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
																					checked={person.noAssets}
																					onChange={(e) => setFieldValue(`persons[${personKey}].noAssets`, e.target.checked)}
																				/>
																				<div className="toggle-switch"/>
																				<span className="toggle-label">No Assets</span>
																			</label>
																		</div>
																	</div>
																</div>

																{
																	!person.noAssets && (
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
																							person.assets && person.assets.map((item, key) => {
																								return (
																									<tr key={`asset${key}`}>
																										<td className="pt-0 pb-1">
																											<input
																												type="text"
																												placeholder=""
																												value={item.name}
																												className={`form-control`}
																												onChange={(e) => setFieldValue(`persons[${personKey}].assets[${key}].name`, e.target.value)}
																											/>
																										</td>
																										<td className="pt-0 pb-1">
																											<input
																												type="number"
																												placeholder=""
																												value={item.value}
																												className={`form-control text-right`}
																												onChange={(e) => setFieldValue(`persons[${personKey}].assets[${key}].value`, parseFloat(e.target.value))}
																											/>
																										</td>
																										<td className="pt-0 pb-1">
																											<input
																												type="text"
																												placeholder=""
																												value={item.detail}
																												className={`form-control`}
																												onChange={(e) => setFieldValue(`persons[${personKey}].assets[${key}].detail`, e.target.value)}
																											/>
																										</td>
																										<td className="pt-0 pb-1">
																											{
																												(key !== 0) && (
																													<span
																														className={'large-round-icon bg-danger'}
																														onClick={() => this.deleteArrayProperty(personKey, 'assets', key)}
																													>
																										<i className="fa fa-close"/>
																									</span>
																												)
																											}
																										</td>
																										<td className="pt-0 pb-1">
																											{
																												(key === (person.assets.length - 1)) && (
																													<span
																														className={'large-round-icon bg-primary'}
																														onClick={() => this.addArrayProperty(personKey, 'assets')}
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
																					{errors['persons'] && errors['persons'][personKey] && errors['persons'][personKey].assets &&
																					touched['persons'] && touched['persons'][personKey] && touched['persons'][personKey].assets ?
																						<div className="invalid-feedback"
																								 style={{display: 'block'}}>Required</div> : null}
																				</div>
																			</div>
																		</div>
																	)
																}
															</div>
														</div>
													)
												})
											}

											<div className="form-row>">
												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5 mr-2 mb-2" type="button"
																	onClick={() => this.navigateTo('customer-step2')}>GO BACK
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
// when submitting, if no assets selected, set assets as empty array
const dealAssets = (persons) => {
	return persons && persons.map(person => {
		if (person.noAssets) {
			person.assets = [];
		}
		return person;
	});
}

const dealProps = (persons) => {
	return persons && persons.map(person => {
		if (!person.assets || (person.assets && person.assets.length === 0)) {
			person['assets'] = [defaultAsset];
		}
		person['noAssets'] = false;
		return person;
	});
};

const EnhancedStep3 = withFormik({
	mapPropsToValues: (props) => {
		const data = props.persons && JSON.parse(JSON.stringify(props.persons));
		return {
			persons: data && data.length > 0 ? dealProps(data) : [defaultPerson],
		}
	},
	validationSchema: formSchema,
	handleSubmit: (
		values, {props, setSubmitting}) => {
		const {saveStepThree} = props;
		const persons = (dealAssets(values['persons']));
		const userDetails = decodeToken();
		if (userDetails && userDetails.customer && userDetails.customer.id)  {
			const customerId = userDetails.customer.id;
			saveStepThree(customerId, persons);
		}
	},
	enableReinitialize: true
})(Step3);

const mapStateToProps = (state) => ({
	persons: getCustomerPersons(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerPersons: loadCustomerPersonsAction,
			saveStepThree: saveStepThreeAction,
		},
		dispatch
	);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedStep3);
