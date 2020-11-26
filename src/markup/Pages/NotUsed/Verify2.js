import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import HeaderLanding from '../../Layout/HeaderLanding'

class Verify2 extends Component {
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
                                                <h4>Upload your ID card</h4>
                                                <span>(Driving License or Government ID card)</span>

                                                <p>Uploading your ID helps as ensure the safety and security of your founds</p>
                                            </div>

                                            <div className="form-group">
                                                <label className="mr-sm-2 mt-2">Upload Front ID </label>
                                                <span className="float-right">Maximum file size is 2mb</span>
                                                <div className="file-upload-wrapper" data-text="front.jpg">
                                                    <input name="file-upload-field" type="file" className="file-upload-field" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="mr-sm-2 mt-2">Upload Back ID </label>
                                                <span className="float-right">Maximum file size is 2mb</span>
                                                <div className="file-upload-wrapper" data-text="back.jpg">
                                                    <input name="file-upload-field" type="file" className="file-upload-field" value="" />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <NavLink to="./verify3" tag={RRNavLink} className="btn btn-success pl-5 pr-5">Submit</NavLink>
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
export default Verify2;
