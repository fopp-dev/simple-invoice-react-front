import React, { Component } from 'react';
import HeaderLanding from '../../Layout/HeaderLanding'

class Verify3 extends Component {

    
    render() {
        window.setTimeout(function() {
            window.location.href = "./verify4";
        }, 0.05);
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
                                                <h4>We are verifying your ID</h4>
                                                <p>Your identity is being verified. We will email you once your verification has completed.
                                        </p>
                                            </div>

                                            <div className="upload-loading text-center mb-3">
                                                <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
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
export default Verify3;
