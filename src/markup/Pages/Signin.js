import React, {Component} from 'react';
import {
	NavLink,
} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {bindActionCreators} from "redux";
import {loginAction} from "../../redux/actions/auth";
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {getErrorCount, getErrorMessage} from "../../redux/selectors/common";
import {ERROR_MESSAGES} from "../../constants";

const formSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid')
		.required('Required'),
	password: Yup.string()
		.required('Required')
});

class Signin extends Component {
	componentDidMount() {
		localStorage.removeItem('selectedCustomer');
		localStorage.removeItem('selectedPartner');
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {errorCount, errorMessage} = this.props;

		if ((prevProps.errorCount !== errorCount) && errorMessage !== '') {
			toastr.error(
				'Login error',
				ERROR_MESSAGES[errorMessage] || 'Something went wrong',
			);
		}
	}

	render() {
		const {values, errors, touched, setFieldValue} = this.props;
		return (
			<div>
				<div className="authincation d-flex align-items-center">
					<div className="container" style={{height: '80%'}}>
						<div className="row justify-content-center h-100 align-items-center">
							<div className="col-xl-4 col-md-6">
								<div className="auth-form card">
									<div className="card-header justify-content-center">
										<h4 className="card-title d-flex justify-content-between w-100">
											<span className="d-flex align-items-center">Sign in</span>
											<img style={{width: '80%', maxWidth: '200px'}} src={require('../../images/mtaji-logo-white.png')} alt='logo'/>
										</h4>
									</div>
									<div className="card-body">
										<Form className='personal_validate'>
											<div className="form-group">
												<label>Email</label>
												<input
													type="email"
													className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
													placeholder="anna.johansson@abc.com"
													name="email"
													value={values['email']}
													onChange={(e) => setFieldValue('email', e.target.value)}
												/>
												{
													errors.email && touched.email ?
														<div className='invalid-feedback'>{errors.email}</div> : null
												}
											</div>
											<div className="form-group">
												<label>Password</label>
												<input
													type="password"
													className={`form-control ${errors.password && touched.password && 'is-invalid'}`}
													placeholder="*******"
													name="password"
													value={values['password']}
													onChange={(e) => setFieldValue('password', e.target.value)}
												/>
												{
													errors.password && touched.password ?
														<div className='invalid-feedback'>{errors.password}</div> : null
												}
											</div>
											<div className="form-row d-flex justify-content-between mt-4 mb-2">
												<div className="form-group mb-0">
													<label className="toggle">
														<input className="toggle-checkbox" type="checkbox"/>
														<div className="toggle-switch"/>
														<span className="toggle-label">Keep me logged in</span>
													</label>
												</div>
												<div className="form-group mb-0">
													<NavLink to="reset" tag={RRNavLink}>Forgot Password?</NavLink>
												</div>
											</div>
											<div className="text-center">
												<button
													type="submit"
													className="btn btn-success btn-block"
												>
													Sign in
												</button>
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*<div className="bg_icons"/>*/}
			</div>

		)
	}
}

const EnhancedSignin = withFormik({
	mapPropsToValues: (props) => {
		return {
			email: '',
			password: ''
		}
	},
	validationSchema: formSchema,
	handleSubmit: (
		values, {props, setSubmitting}) => {
		const {login} = props;
		login(values, props.history);
	},
	enableReinitialize: true
})(Signin);

const mapStateToProps = (state) => ({
	errorMessage: getErrorMessage(state),
	errorCount: getErrorCount(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			login: loginAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedSignin);
