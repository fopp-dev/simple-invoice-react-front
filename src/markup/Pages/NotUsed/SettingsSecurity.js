import React, { Component } from 'react';
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import Header from '../../Layout/Header';
import PageTitle from '../PageTitle';

class SettingsSecurity extends Component {
    render() {
        return (
            <div>
                <Header />
                <PageTitle />
                <div className="settings mb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-md-4">
                                <div className="card settings_menu">
                                    <div className="card-header">
                                        <h4 className="card-title">Settings</h4>
                                    </div>
                                    <div className="card-body">
                                        <ul>
                                            <NavItem>
                                                <NavLink to='/settings' exact tag={RRNavLink}>
                                                    <i className="la la-user"></i>
                                                    <span>Edit Profile</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink to='/settingsPreferences' tag={RRNavLink}>
                                                    <i className="la la-cog"></i>
                                                    <span>Preferences</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink to='/settingsSecurity' tag={RRNavLink}>
                                                    <i className="la la-lock"></i>
                                                    <span>Security</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink to='/settingsAccount' tag={RRNavLink}>
                                                    <i className="la la-bank"></i>
                                                    <span>Linked Account</span>
                                                </NavLink>
                                            </NavItem>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Security</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-xl-4">
                                                <div className="id_card">
                                                    <img src={require('../../../images/id.png')} alt="" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="id_info">
                                                    <h3>Maria Pascle </h3>
                                                    <p className="mb-1 mt-3">ID: 0024 5687 2254 3698 </p>
                                                    <p className="mb-1">Status: <span className="font-weight-bold">Verified</span></p>
                                                    <a href="verify-step-2.html" className="btn btn-success mt-3">New ID</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="phone_verify">
                                                    <h4 className="card-title mb-3">Email Address</h4>
                                                    <form action="otp-2.html">
                                                        <div className="form-row align-items-center">
                                                            <div className="form-group col-xl-6">
                                                                <input type="text" className="form-control" placeholder="hello@example.com " />
                                                                <button className="btn btn-success mt-4">Add</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="phone_verified">
                                                    <h5> <span><i className="fa fa-envelope"></i></span> hello@example.com</h5>
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span><i className="la la-check"></i></span>
                                                            <NavLink>Verified</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="phone_verify">
                                                    <h4 className="card-title mb-3">Add Phone Number</h4>
                                                    <form action="otp-2.html">
                                                        <div className="form-row align-items-center">
                                                            <div className="form-group col-xl-6">
                                                                <input type="text" className="form-control" placeholder="+1 2335 2458 " />
                                                                <button className="btn btn-success mt-4">Add</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="phone_verified">
                                                    <h5> <span><i className="fa fa-phone"></i></span> +1 23584 2659</h5>
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span><i className="la la-check"></i></span>
                                                            <NavLink>Verified</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
export default SettingsSecurity;
