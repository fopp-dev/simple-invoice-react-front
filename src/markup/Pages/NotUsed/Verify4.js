import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Verify4 extends Component {
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
                                <form action="add-debit-card.html" className="identity-upload">
                                    <div className="identity-content">
                                        <span className="icon"><i className="fa fa-check"></i></span>
                                        <h4>Identity Verified</h4>
                                        <p>Congrats! your identity has been successfully verified and your investment limit has been increased.</p>
                                    </div>

                                    <div className="text-center mb-4">
                                        <NavLink to="./addCard" tag={RRNavLink}  className="btn btn-success pl-5 pr-5">Continue</NavLink>
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
export default Verify4;
