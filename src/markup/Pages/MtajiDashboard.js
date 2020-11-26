import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import MtajiHeader from "../Layout/MtajiHeader";
import {bindActionCreators} from "redux";
import {getAllCustomers, getAllPartners} from "../../redux/selectors/mtaji";
import {loadAllCustomersAction} from "../../redux/actions/matji";
import {CUSTOMER_APPLICATION_STATUS, CUSTOMER_REGISTRATION_STEPS, userRoles} from "../../constants";
import history from "../../history";
import DashboardTab from "./Partials/Partner/DashboardTab";
import {loadPartnerCustomersAction} from "../../redux/actions/partner";
import {getPartnerCustomers} from "../../redux/selectors/partner";
import PartnerCreditInformation from "./Partials/Partner/PartnerCreditInformation";
import {getRole} from "../../redux/selectors/auth";

class MtajiDashboard extends Component {
	state = {
		selectedCustomer: '-1',
		selectedPartner: '-1',
	};

	componentDidMount() {
		const preSelectedCustomerId = localStorage.getItem('selectedCustomer');
		const preSelectedPartnerId = localStorage.getItem('selectedPartner');

		if (preSelectedCustomerId) {
			this.setState({'selectedCustomer': preSelectedCustomerId});
		}

		if (preSelectedPartnerId) {
			this.setState({'selectedPartner': preSelectedPartnerId});
		}

		this.loadPartnerCustomers();
	}

	loadPartnerCustomers = () => {
		const {selectedPartner} = this.state;

		if (selectedPartner !== '-1') {
			const {loadPartnerCustomers} = this.props;
			loadPartnerCustomers(selectedPartner);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {selectedPartner} = this.state;

		if (selectedPartner !== prevState.selectedPartner) {
			this.loadPartnerCustomers(selectedPartner);
		}
	}

	changeCustomer = (e) => {
		const customerId = e.target.value;
		this.setState({
			selectedCustomer: customerId,
		});
		localStorage.setItem('selectedCustomer', customerId);
	};

	goToCustomerDetails = () => {
		const {selectedCustomer} = this.state;
		const {customers} = this.props;

		const item = customers.find(customer => customer.id === parseInt(selectedCustomer));
		// check which page to be redirected
		if (item) {
			const startedStep = item.logs && item.logs.find(log => log.status === CUSTOMER_APPLICATION_STATUS.STARTED);

			if (startedStep) {
				switch (startedStep.applicationStep) {
					case CUSTOMER_REGISTRATION_STEPS['2_SUBMIT_APPLICATION']:
						alert('customer haven\'t submitted registration steps yet');
						break;
					case CUSTOMER_REGISTRATION_STEPS['3_PARTNER_APPROVE_APPLICATION']:
						alert('partner is on process of approving cutomer\'s application');
						break;
					case CUSTOMER_REGISTRATION_STEPS['8_SIGN_LOAN_DOCUMENTS']:
						alert('partner is on process of signing loan documents');
						break;
					case CUSTOMER_REGISTRATION_STEPS['9_APPROVE_CREDIT']:
						history.push({
							pathname: `/activate-credit/${selectedCustomer}`,
							from: '/mtaji-dashboard',
						})
						break;
					default:
						alert('no action');
				}
			} else {
				if (item.logs && (item.logs.length === 5)) {
					history.push({
						pathname: `/customer-overview/${selectedCustomer}`,
						from: '/mtaji-dashboard'
					});
				} else {
					alert('no action');
				}
			}
		}
	};

	selectPartner = (value) => {
		this.setState({selectedPartner: value});
		localStorage.setItem('selectedPartner', value);
	}

	render() {
		const {selectedCustomer, selectedPartner} = this.state;
		const {
			customers,
			partners,
			role,
		} = this.props;
		const item = partners && partners.find(partner => partner.id == selectedPartner);
		const headline = selectedPartner === '-1' ? 'Select a partner' : `Selected Partner: ${item && item.name}`;
		const visibleLeafIcon = (role === userRoles.mtaji_global_credit);

		return (
			<div>
				<MtajiHeader
					selectedPartner={selectedPartner}
					selectPartner={this.selectPartner}
				/>
				<PageTitle title={headline}/>
				{
					selectedPartner !== '-1' && (
						<div className="homepage mb-80">
							<div className="container">
								<div className='row'>
									<div className='col-xl-4 col-lg-4'>
										<div className="card profile_card">
											<div className='card-header'>
												<h4>Partner Credit Limit</h4>
											</div>
											<div className="card-body">
												<PartnerCreditInformation
													partnerId={selectedPartner}
												/>
											</div>
										</div>
									</div>

									<div className='col-xl-8 col-lg-8'>
										<div className='card'>
											<div className='card-body'>
												{
													selectedPartner !== '-1' && (
														<div className='row'>
															<div className='form-group col-md-4'>
																<select
																	className="form-control"
																	value={selectedCustomer}
																	onChange={this.changeCustomer}
																>
																	<option value='-1'>Select Customer</option>
																	{
																		customers && customers.map((customer, index) => (
																			<option
																				value={customer.id}
																				key={index}
																			>
																				{customer.tradingName}
																			</option>
																		))
																	}
																</select>
															</div>

															<div className='col-md-8'>
																{
																	selectedCustomer === '-1' ?
																		<button className={`btn btn-primary btn-block disabled`}
																						style={{cursor: 'default'}}>
																			GO TO CUSTOMER DETAILS
																		</button> :
																		<button
																			className={`btn btn-primary btn-block`}
																			onClick={this.goToCustomerDetails}
																		>
																			GO TO CUSTOMER DETAILS
																		</button>
																}
															</div>
														</div>
													)
												}
												<div className='row'>
													<div className='col-md-12'>
														<DashboardTab
															partnerId={selectedPartner}
															customerId={selectedCustomer}
															visibleReadLeafIcon={true}
															visibleUpdateLeafIcon={visibleLeafIcon}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	role: getRole(state),
	customers: getPartnerCustomers(state),
	partners: getAllPartners(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadPartnerCustomers: loadPartnerCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)
(MtajiDashboard);
