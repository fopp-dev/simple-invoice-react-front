import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Otp2 extends Component {
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
                                                <label>Your OTP Code</label>
                                                <input type="text" className="form-control text-center font-weight-bold" placeholder="11 22 33" />
                                            </div>
                                            <div className="text-center mt-4">
                                                <NavLink to="/" className="btn btn-success btn-block" tag={RRNavLink}>Verify</NavLink>
                                            </div>
                                        </form>
                                        <div className="info mt-3">
                                            <p className="text-muted">You dont recommended to save password to browsers!</p>
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
export default Otp2;
