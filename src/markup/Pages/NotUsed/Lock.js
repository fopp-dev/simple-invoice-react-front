import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import HeaderLanding from '../../Layout/HeaderLanding'
import { NavLink as RRNavLink } from 'react-router-dom';

class Lock extends Component {
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
                                        <h4 className="card-title">Locked</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group mb-4">
                                                <label>Enter Password</label>
                                                <input type="password" className="form-control bg-transparent rounded-0" placeholder="Password" />
                                            </div>
                                            <NavLink className="btn btn-success btn-block text-center" to="/" tag={RRNavLink}>Unlock</NavLink>
                                        </form>
                                        <div className="new-account text-center mt-3">
                                            <NavLink className="text-primary" to="reset" tag={RRNavLink}>
                                                <h5>Not Maria Pascle?</h5>
                                            </NavLink>
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
export default Lock;
