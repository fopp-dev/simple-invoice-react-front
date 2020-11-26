import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Otp1 extends Component {
    render() {
        return (
            <div>
                <HeaderLanding />
                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-body">
                                        <a className="page-back text-muted" href="signin.html"><span><i
                                            className="fa fa-angle-left"></i></span> Back</a>
                                        <h3 className="text-center">OTP Verification</h3>
                                        <p className="text-center mb-5">We will send one time code on this number</p>
                                        <form>
                                            <div className="form-group">
                                                <label>Your phone number</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text pl-4 pr-4"><i
                                                            className="fa fa-phone"></i></span>
                                                    </div>
                                                    <input type="text" className="form-control" placeholder="+1 12365480" />
                                                </div>
                                            </div>
                                            <div className="text-center mt-4">
                                                <NavLink to="otp2" className="btn btn-success btn-block" tag={RRNavLink}>Send</NavLink>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3 d-flex justify-content-between">
                                            <p>Don't get code? <NavLink className="text-primary d-inline-block" to="otp-1" tag={RRNavLink}>Resend</NavLink></p>
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
export default Otp1;
