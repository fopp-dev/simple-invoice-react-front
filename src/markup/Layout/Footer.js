import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-md-6">
                            <div className="copy_right">
                                Copyright © 2020 Mtaji. All Rights Reserved.
                        </div>
                        </div>
                        <div className="col-xl-6 col-md-6 text-lg-right text-center">
                            <div className="social">
                                <NavLink to="/" tag={RRNavLink}><i className="fa fa-youtube-play"></i></NavLink>
                                <NavLink to="/" tag={RRNavLink}><i className="fa fa-instagram"></i></NavLink>
                                <NavLink to="/" tag={RRNavLink}><i className="fa fa-twitter"></i></NavLink>
                                <NavLink to="/" tag={RRNavLink}><i className="fa fa-facebook"></i></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;
