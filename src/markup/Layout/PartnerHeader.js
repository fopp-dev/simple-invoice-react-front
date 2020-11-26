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
import history from "../../history";

// import {} from 'react-router-dom'

const PartnerHeader = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const signout = () => {
		localStorage.clear();

		history.push('/signin');
	};

	return (
		<div className="header dashboard">
			<Container>
				<Row>
					<Col>
						<Navbar light expand="lg" className="p-0">
							<NavbarBrand to="/partner-dashboard" tag={RRNavLink}>
								<img className="img-fluid bg-white" src={require('./../../images/mtaji-logo.png')} alt="" />
							</NavbarBrand>
							<NavbarToggler onClick={toggle} />
							<Collapse isOpen={isOpen} navbar>
								<Nav navbar>
									<NavItem>
										<NavLink to='/partner-dashboard' exact tag={RRNavLink}>Dashboard</NavLink>
									</NavItem>
								</Nav>
							</Collapse>

							<div className="dashboard_log my-2">
								<div className="d-flex align-items-center">
									<UncontrolledDropdown nav inNavbar className="profile_log ">
										<DropdownToggle nav className="user">
											<span className="thumb"><i className="la la-user"/></span>
											<span className="name">Actions</span>
											<span className="arrow"><i className="la la-angle-down"/></span>
										</DropdownToggle>
										<DropdownMenu right>
											<DropdownItem to="/customer-register" tag={RRNavLink}>
												Register New Customer
											</DropdownItem>
											<DropdownItem to="/upload-bank-statement" tag={RRNavLink}>
												Upload Bank Statement
											</DropdownItem>
											<DropdownItem onClick={signout}>
												Sign out
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

export default PartnerHeader;
