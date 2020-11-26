import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import MtajiHeader from "../Layout/MtajiHeader";
import {userRoles} from "../../constants";
import {updateUser} from "../../http/http-calls";
import {loadUserDetail} from "../../http/http-calls";
import history from "../../history";

const formSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid')
		.required('Required'),
	name: Yup.string()
		.required('Required'),
	enabled: Yup.bool(),
	password: Yup.string(),
	role: Yup.string(),
	partner: Yup.string(),
	customer: Yup.string(),
});

class EditUser extends Component {
	async componentDidMount() {
		const {
			setFieldValue,
			match,
		} = this.props;
		const id = match.params.id;

		if (id) {
			try {
				const user = await loadUserDetail(id);
				setFieldValue('email', user.email);
				setFieldValue('enabled', user.enabled);
				setFieldValue('name', user.name);
				setFieldValue('role', user.role);
				if (user.role === userRoles.partner && user.partner) {
					setFieldValue('partner', user.partner.name);
				}
				if (user.role === userRoles.customer && user.customer) {
					setFieldValue('customer', user.customer.tradingName);
				}
			} catch (e) {
				console.log(e.response.data);
			}
		}
	}

	goBack = () => {
		history.push('/mtaji-user-administration');
	}

	render() {
		const {
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
		} = this.props;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<MtajiHeader/>
				<PageTitle title={'Edit User'}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title">Personal Information</h4>
									</div>
									<div className="card-body">
										<Form className="personal_validate">
											<div className="form-row">
												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Email</label>
														</div>
														<div className="col-md-7">
															<input
																type="email"
																placeholder="michael.denver@email.com"
																name="email"
																className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
																value={values["email"]}
																onChange={(e) => setFieldValue('email', e.target.value)}
															/>
															{errors.email && touched.email ?
																<div className="invalid-feedback">{errors.email}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Contact Name</label>
														</div>
														<div className="col-md-7">
															<input
																type="text"
																placeholder="Michael Denver"
																name="name"
																className={`form-control ${errors.name && touched.name && 'is-invalid'}`}
																value={values["name"]}
																onChange={(e) => setFieldValue('name', e.target.value)}
															/>
															{errors.name && touched.name ?
																<div className="invalid-feedback">{errors.name}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Enabled</label>
														</div>
														<div className="col-md-7">
															<label className="toggle">
																<input
																	className="toggle-checkbox"
																	type="checkbox"
																	checked={values['enabled']}
																	onChange={(e) => setFieldValue('enabled', e.target.checked)}
																/>
																<div className="toggle-switch"/>
																<span className="toggle-label"/>
															</label>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Password</label>
														</div>
														<div className="col-md-7">
															<input
																type="text"
																name="password"
																className={`form-control`}
																value={values["password"]}
																onChange={(e) => setFieldValue('password', e.target.value)}
															/>
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Role</label>
														</div>
														<div className="col-md-7">
															<input
																type="text"
																name="role"
																className={`form-control`}
																value={values["role"]}
																disabled={true}
															/>
														</div>
													</div>
												</div>

												{
													values['role'] === userRoles.partner && (
														<div className="form-group col-xl-6">
															<div className="row">
																<div className="col-md-3 offset-md-1">
																	<label className="mr-sm-2 mt-2">Partner</label>
																</div>
																<div className="col-md-7">
																	<input
																		type="text"
																		name="partner"
																		className={`form-control`}
																		value={values["partner"]}
																		disabled={true}
																	/>
																</div>
															</div>
														</div>
													)
												}

												{
													values['role'] === userRoles.customer && (
														<div className="form-group col-xl-6">
															<div className="row">
																<div className="col-md-3 offset-md-1">
																	<label className="mr-sm-2 mt-2">Customer</label>
																</div>
																<div className="col-md-7">
																	<input
																		type="text"
																		name="partner"
																		className={`form-control`}
																		value={values["customer"]}
																		disabled={true}
																	/>
																</div>
															</div>
														</div>
													)
												}

												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5" type="button" onClick={this.goBack}>Go back</button>
													<button className="btn btn-success ml-3 pl-5 pr-5" type="submit">Save</button>
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

const EnhancedEditUser = withFormik({
	mapPropsToValues: (props) => {
		return {
			email: '',
			name: '',
			role: '',
			enabled: false,
			password: '',
			partner: '',
			customer: '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting}) => {
		const data = {
			email: values.email,
			enabled: values.enabled,
			password: values.password,
			name: values.name,
		};
		const id = props.match.params.id;
		await updateUser(id, data);
		setSubmitting(false);
		history.push('/mtaji-user-administration');
	},
	enableReinitialize: true
})(EditUser);

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{

		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedEditUser);
