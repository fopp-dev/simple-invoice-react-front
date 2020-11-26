import React, { Component } from 'react';
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import Header from '../../Layout/Header';
import PageTitle from '../PageTitle';


class SettingsAccount extends Component {
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
                                        <h4 className="card-title">Linked Account or Card</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form">
                                            <ul className="linked_account">
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="media">
                                                                <span className="mr-3"><i className="fa fa-bank"></i></span>
                                                                <div className="media-body">
                                                                    <h5 className="mt-0 mb-1">Bank of America</h5>
                                                                    <p>Bank **************5421</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <NavLink><i className="fa fa-eye"></i></NavLink>
                                                                    <NavLink><i className="fa fa-pencil"></i></NavLink>
                                                                    <NavLink><i className="fa fa-trash"></i></NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <NavLink>Verified</NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="media my-4">
                                                                <span className="mr-3"><i className="fa fa-cc-mastercard"></i></span>
                                                                <div className="media-body">
                                                                    <h5 className="mt-0 mb-1">Master Card</h5>
                                                                    <p>Credit Card *********5478</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <NavLink><i className="fa fa-eye"></i></NavLink>
                                                                    <NavLink><i className="fa fa-pencil"></i></NavLink>
                                                                    <NavLink><i className="fa fa-trash"></i></NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <NavLink>Verified</NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="media">
                                                                <span className="mr-3"><i className="fa fa-credit-card"></i></span>
                                                                <div className="media-body">
                                                                    <h5 className="mt-0 mb-1">Debit Card</h5>
                                                                    <p>Prepaid Card *********5478</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <NavLink><i className="fa fa-eye"></i></NavLink>
                                                                    <NavLink><i className="fa fa-pencil"></i></NavLink>
                                                                    <NavLink><i className="fa fa-trash"></i></NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="not-verify">
                                                                    <span><i className="la la-close"></i></span>
                                                                    <NavLink>Not verified</NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <div className="mt-5">
                                                <NavLink to="./verify5" className="btn btn-primary px-4 mr-3" tag={RRNavLink}>Add Bank
                                            Account</NavLink>
                                                <NavLink to="./verify1" className="btn btn-success px-4" tag={RRNavLink}>Add Debit
                                            Account</NavLink>
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
export default SettingsAccount;
