import React, {useState} from 'react';
import {connect} from "react-redux";
import history from "../../history";
import {
	Container, Row, Col,
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
import {NavLink as RRNavLink, Redirect} from 'react-router-dom';
import {userRoles} from "../../constants";
import {bindActionCreators} from "redux";
import {loadAllPartnersAction} from "../../redux/actions/matji";
import {getAllPartners} from "../../redux/selectors/mtaji";
import {getRole} from "../../redux/selectors/auth";

// import {} from 'react-router-dom'

class MtajiHeader extends React.Component {
	state = {isOpen: false};

	componentDidMount() {
		const {loadAllPartners} = this.props;
		loadAllPartners();
	}

	toggle = () => {
		this.setState({isOpen: !this.state.isOpen});
	}

	signout = () => {
		localStorage.clear();

		history.push('/signin');
	};

	navigateTo = (path) => {
		history.push('/mtaji-user-administration');
	};

	render() {
		const {isOpen} = this.state;
		const {
			role,
			partners,
			selectPartner,
			selectedPartner,
		} = this.props;

		return (
			<div className="header dashboard">
				<Container>
					<Row>
						<Col>
							<Navbar light expand="lg" className="p-0">
								<NavbarBrand to="/mtaji-dashboard" tag={RRNavLink}>
									<img className="img-fluid bg-white" src={require('./../../images/mtaji-logo.png')} alt="" />
								</NavbarBrand>
								<NavbarToggler onClick={this.toggle}/>
								<Collapse isOpen={isOpen} navbar>
									<Nav navbar>
										<NavItem>
											<NavLink to='/mtaji-dashboard' exact tag={RRNavLink}>Dashboard</NavLink>
										</NavItem>
									</Nav>

									<select
										className="form-control"
										style={{width: '200px'}}
										value={selectedPartner}
										onChange={(e) => selectedPartner ? selectPartner(e.target.value) : null}
									>
										<option value='-1'>Select Partner</option>
										{
											partners && partners.map((partner, index) => (
												<option value={partner.id} key={index}>{partner.name}</option>
											))
										}
									</select>
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
												{
													role === userRoles.mtaji_global_credit && (
														<DropdownItem onClick={() => this.navigateTo('/mtaji-user-administration')}>
															User Administration
														</DropdownItem>
													)
												}
												<DropdownItem onClick={this.signout}>
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
}

const mapStateToProps = (state) => ({
	role: getRole(state),
	partners: getAllPartners(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			loadAllPartners: loadAllPartnersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MtajiHeader);
