import React, {Component} from 'react';
import {
	NavLink,
} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {resetPassword} from "../../http/http-calls";
import {toastr} from "react-redux-toastr";
import history from "../../history";

class Reset extends Component {
	state = {
		email: ''
	}

	changePassword = (value) => {
		this.setState({email: value});
	}

	submit = async (e) => {
		e.preventDefault();
		try {
			await resetPassword(this.state);
			toastr.success(
				'Password reset information has been sent to your email address',
			);
			history.push('/signin');
		} catch (e) {
			console.log(e.response.data);
			toastr.error(
				'Something went wrong',
			);
		}
	}

	render() {
		return (
			<div>
				{/*<HeaderLanding />*/}
				<div className="authincation d-flex align-items-center">
					<div className="container" style={{height: '80%'}}>
						<div className="row justify-content-center h-100 align-items-center">
							<div className="col-xl-4 col-md-6">
								<div className="auth-form card">
									<div className="card-header justify-content-center">
										<h4 className="card-title d-flex justify-content-between w-100">
											<span className="d-flex align-items-center">Reset password</span>
											<img style={{width: '80%', maxWidth: '200px'}} src={require('../../images/mtaji-logo-white.png')} alt='logo'/>
										</h4>
									</div>
									<div className="card-body">
										<form onSubmit={this.submit}>
											<div className="form-group">
												<label>Email</label>
												<input
													type="email"
													className="form-control"
													required
													value={this.state.email}
													onChange={(e) => this.changePassword(e.target.value)}
													placeholder="hello@example.com"
												/>
											</div>
											<div className="text-center">
												<button className="btn btn-success btn-block" type='submit'>Reset</button>
											</div>
										</form>
										<div className="new-account mt-3">
											<p className="mb-1 d-inline-block">Don't Received? </p>
											{/*<NavLink className="text-primary d-inline-block" to="reset" tag={RRNavLink}>Resend </NavLink>*/}
											<NavLink className="text-primary d-inline-block" to="signin" tag={RRNavLink}>Back </NavLink>
										</div>
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

export default Reset;
