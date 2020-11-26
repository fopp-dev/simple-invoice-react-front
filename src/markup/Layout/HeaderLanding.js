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
import ScrollspyNav from "react-scrollspy-nav";

// import {} from 'react-router-dom'

const HeaderLanding = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header dashboard">
            <Container>
                <Row>
                    <Col>
                        <Navbar light expand="lg" className="p-0">
                            <NavbarBrand to="/landing" tag={RRNavLink}>
                                <img className="img-fluid" src={require('./../../images/w_logo.png')} alt="" />
                                <span>Tradient</span>
                            </NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <ScrollspyNav
                                    scrollTargetIds={["intro", "market", "portfolio"]}
                                    offset={100}
                                    activeNavClass="is-active"
                                    scrollDuration="1000"
                                    headerBackground="true"
                                >
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink href="#intro">Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#market">Market</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#portfolio">Portfolio</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#testimonial">Testimonial</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#contact">Contact</NavLink>
                                        </NavItem>
                                    </Nav>
                                </ScrollspyNav>

                            </Collapse>

                            <div className="dashboard_log my-2">
                                <div className="d-flex align-items-center">
                                <div class="header_auth">
                                        <a href="./signin" class="btn btn-success">Sign In</a>
                                        <a href="./signup" class="btn btn-outline-primary">Sign Up</a>
                                    </div>
                                </div>
                            </div>

                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderLanding;