import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from './../Layout/HeaderLanding'

class Signup extends Component {
    render() {
        return (
            <div>
                <HeaderLanding />
                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header justify-content-center">
                                        <h4 className="card-title">Sign up your account</h4>
                                    </div>
                                    <div className="card-body">
                                        <form method="post" name="myform" className="signup_validate">
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input type="text" className="form-control" placeholder="username" name="username" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" placeholder="hello@example.com" name="email" />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control" placeholder="Password" name="password" />
                                            </div>
                                            <div className="text-center mt-4">
                                                <NavLink to="signin" className="btn btn-success btn-block" tag={RRNavLink}>Sign up</NavLink>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p>Already have an account? <NavLink className="text-primary d-inline-block" to="signin" tag={RRNavLink}>Sign in</NavLink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg_icons"></div>
            </div>
        )
    }
}
export default Signup;