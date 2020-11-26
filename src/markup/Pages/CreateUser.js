import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {createUserAction} from "../../redux/actions/user";
import MtajiHeader from "../Layout/MtajiHeader";
import {userRoles} from "../../constants";
import {createUser} from "../../http/http-calls";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import {getAllPartners} from "../../redux/selectors/mtaji";
import {loadAllPartnersAction} from "../../redux/actions/matji";

const formSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid')
		.required('Required'),
	name: Yup.string()
		.required('Required'),
	role: Yup.string()
		.test(
			'is-selected',
			'Select Role',
			function (value) {
				return value !== '-1';
			}
		)
		.required('Required'),
	enabled: Yup.bool(),
	partner: Yup.string()
		.when('role', {
			is: (role) => {
				return role === 'partner'
			},
			then: Yup.string()
				.test(
					'is-selected',
					'Select Partner',
					function (value) {
						return value !== '-1';
					}
				)
		}),
	password: Yup.string(),
});

class CreateUser extends Component {
	componentDidMount() {
		const {loadAllPartners} = this.props;

		loadAllPartners();
	}

	goBack = () => {
		history.push('/mtaji-user-administration');
	}

	render() {
		const {
			allPartners,
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
			setStatus,
			status,
		} = this.props;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<MtajiHeader/>
				<ModalDialog
					show={status && status.success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						`Email sent to ${values['email']} successfully`
					)}
					okText={'Ok'}
					onClickOk={() => {
						setStatus({success: false});
						history.push('/mtaji-user-administration');
					}}
				/>
				<PageTitle title={'New User'}/>
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
																placeholder=""
																name="password"
																className={`form-control ${errors.password && touched.password && 'is-invalid'}`}
																value={values["password"]}
																onChange={(e) => setFieldValue('password', e.target.value)}
															/>
															{errors.password && touched.password ?
																<div className="invalid-feedback">{errors.password}</div> : null}
														</div>
													</div>
												</div>

												<div className="form-group col-xl-6">
													<div className="row">
														<div className="col-md-3 offset-md-1">
															<label className="mr-sm-2 mt-2">Role</label>
														</div>
														<div className="col-md-7">
															<select
																className={`form-control ${errors.role && touched.role && 'is-invalid'}`}
																value={values['role']}
																onChange={(e) => setFieldValue('role', e.target.value)}
															>
																<option value='-1'>
																	Select Role
																</option>
																<option value='partner'>
																	Partner
																</option>
																<option value='mtaji local admin'>
																	Mtaji Local Admin
																</option>
																<option value='mtaji local credit'>
																	Mtaji Local Credit
																</option>
																<option value='mtaji global credit'>
																	Mtaji Global Credit
																</option>
															</select>
															{errors.role && touched.role ?
																<div className="invalid-feedback">{errors.role}</div> : null}
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
																	<select
																		className={`form-control ${errors.partner && touched.partner && 'is-invalid'}`}
																		value={values['partner']}
																		onChange={(e) => setFieldValue('partner', e.target.value)}
																	>
																		<option value={'-1'}>
																			Select Partner
																		</option>
																		{
																			allPartners &&
																			allPartners.map((item, key) => {
																				return (
																					<option value={item.id} key={`unregistered-partner-${key}`}>
																						{item.name}
																					</option>
																				);
																			})
																		}
																	</select>
																	{errors.partner && touched.partner ?
																		<div className="invalid-feedback">{errors.partner}</div> : null}
																</div>
															</div>
														</div>
													)
												}
												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5" type="button" onClick={this.goBack}>Go back</button>
													<button className="btn btn-success ml-3 pl-5 pr-5" type="submit">Create</button>
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

const EnhancedCreateUser = withFormik({
	mapPropsToValues: (props) => {
		return {
			email: '',
			name: '',
			role: '-1',
			password: '',
			enabled: false,
			partner: '-1',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setStatus, setSubmitting}) => {
		try {
			await createUser({...values, partner: parseInt(values.partner)});
			setSubmitting(false);
			setStatus({success: true});
		} catch (e) {
			console.log(e.response.data);
			setSubmitting(false);
		}

		setSubmitting(false);
	},
	enableReinitialize: true
})(CreateUser);

const mapStateToProps = (state) => ({
	allPartners: getAllPartners(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			loadAllPartners: loadAllPartnersAction,
			createUser: createUserAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedCreateUser);
