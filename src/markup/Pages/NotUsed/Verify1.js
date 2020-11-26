import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Verify1 extends Component {
    render() {
        return (
            <div>
                <HeaderLanding />
                <div className="verification section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header">
                                        <h4 className="card-title">Link a Debit card</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="identity-content">
                                                <span className="icon"><i className="fa fa-shield"></i></span>
                                                <h4>Please verify your identity before adding your card</h4>
                                                <p>Uploading your ID helps as ensure the safety and security of your founds</p>
                                            </div>

                                            <div className="text-center">
                                                <NavLink to="./verify2" tag={RRNavLink} className="btn btn-success pl-5 pr-5">Upload ID</NavLink>
                                            </div>
                                        </form>
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
export default Verify1;
