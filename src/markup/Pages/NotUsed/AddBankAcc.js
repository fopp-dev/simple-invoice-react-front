import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class AddBank extends Component {
    render() {
        return (
            <div>
                <HeaderLanding />
                <div className="verification section-padding mb-80">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center  my-5">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header">
                                        <h4 className="card-title">Link a bank account</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-xl-12">
                                                    <label className="mr-sm-2 mt-2">Routing number </label>
                                                    <input type="text" className="form-control" placeholder="25487" />
                                                </div>
                                                <div className="form-group col-xl-12">
                                                    <label className="mr-sm-2 mt-2">Account number </label>
                                                    <input type="text" className="form-control" placeholder="36475" />
                                                </div>
                                                <div className="form-group col-xl-12">
                                                    <label className="mr-sm-2 mt-2">Fulll name </label>
                                                    <input type="text" className="form-control" placeholder="Maria Pascle" />
                                                </div>
                                                <div className="form-group col-xl-12">
                                                    <img src={require('../../../images/routing.png')} alt="" className="img-fluid" />
                                                </div>

                                                <div className="text-center col-12">
                                                    <NavLink to="./verify5" tag={RRNavLink} className="btn btn-primary mx-2">Back</NavLink>
                                                    <NavLink to="./verify6" tag={RRNavLink} className="btn btn-success mx-2">Save</NavLink>
                                                </div>
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
export default AddBank;
