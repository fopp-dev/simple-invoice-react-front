import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class AddCard extends Component {
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
                                        <h4 className="card-title">Link a debit card</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-xl-12">
                                                    <label className="mr-sm-2 mt-2">Name on card </label>
                                                    <input type="text" className="form-control" placeholder="Maria Pascle" />
                                                </div>
                                                <div className="form-group col-xl-12">
                                                    <label className="mr-sm-2 mt-2">Card number </label>
                                                    <input type="text" className="form-control" placeholder="5658 4258 6358 4756" />
                                                </div>
                                                <div className="form-group col-xl-4">
                                                    <label className="mr-sm-2 mt-2">Expiration </label>
                                                    <input type="text" className="form-control" placeholder="10/22" />
                                                </div>
                                                <div className="form-group col-xl-4">
                                                    <label className="mr-sm-2 mt-2">CVC </label>
                                                    <input type="text" className="form-control" placeholder="125" />
                                                </div>
                                                <div className="form-group col-xl-4">
                                                    <label className="mr-sm-2 mt-2">Postal code </label>
                                                    <input type="text" className="form-control" placeholder="2368" />
                                                </div>

                                                <div className="text-center col-12">
                                                    <NavLink to="./verify6" tag={RRNavLink}  className="btn btn-success pl-5 pr-5">Save</NavLink>
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
export default AddCard;
