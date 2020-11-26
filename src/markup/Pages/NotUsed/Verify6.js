import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Verify6 extends Component {
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
                                        <h4 className="card-title">Upload your identity</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="identity-content">
                                                <span className="icon"><i className="fa fa-check"></i></span>
                                                <h4>Congratulation. Your bank added</h4>
                                                <p>Efficiently provide access to installed base core competencies and end end data Interactively target equity.</p>
                                            </div>

                                            <div className="text-center">
                                                <NavLink to="./settingsAccount" tag={RRNavLink}  className="btn btn-success pl-5 pr-5">Continue</NavLink>
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
export default Verify6;
