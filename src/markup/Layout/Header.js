import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

// import {} from 'react-router-dom'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header dashboard">
            <Container>
                <Row>
                    <Col>
                        <Navbar light expand="lg" className="p-0">
                            <NavbarBrand to="/" tag={RRNavLink}>
                                <img className="img-fluid bg-white" src={require('./../../images/mtaji-logo.png')} alt="" />
                            </NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink to='/' exact tag={RRNavLink}>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='/buysell' tag={RRNavLink}>Buy Sell</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='/accounts' tag={RRNavLink}>Accounts</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='/settings' tag={RRNavLink}>Settings</NavLink>
                                    </NavItem>
                                </Nav>

                            </Collapse>

                            <div className="dashboard_log my-2">
                                <div className="d-flex align-items-center">
                                    <div className="account_money">
                                        <ul>
                                            <li className="crypto">
                                                <span>0.0025</span>
                                                <i className="cc BTC-alt"></i>
                                            </li>
                                            <li className="usd">
                                                <span>19.93 USD</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <UncontrolledDropdown nav inNavbar className="profile_log ">
                                        <DropdownToggle nav className="user">
                                            <span className="thumb"><i className="la la-user"></i></span>
                                            <span className="name">Maria Pascle</span>
                                            <span className="arrow"><i className="la la-angle-down"></i></span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem to="/accounts" tag={RRNavLink}>
                                                <i className="la la-user"></i> Account
                                                </DropdownItem>
                                            <DropdownItem to="/history" tag={RRNavLink}>
                                                <i className="la la-book"></i> History
                                                </DropdownItem>
                                            <DropdownItem to="/settings" tag={RRNavLink}>
                                                <i className="la la-cog"></i> Setting
                                                </DropdownItem>
                                            <DropdownItem to="/lock" tag={RRNavLink}>
                                                <i className="la la-lock"></i> Lock
                                                </DropdownItem>
                                            <DropdownItem to="/signin" tag={RRNavLink}>
                                                <i className="la la-sign-out"></i> Logout
                                                </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                </div>
                            </div>

                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
