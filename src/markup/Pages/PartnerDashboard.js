import React, {Component} from 'react'
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import PartnerHeader from "../Layout/PartnerHeader";
import {bindActionCreators} from "redux";
import {loadPartnerCustomersAction} from "../../redux/actions/partner";
import {getPartnerCustomers} from "../../redux/selectors/partner";
import {CUSTOMER_APPLICATION_STATUS, CUSTOMER_REGISTRATION_STEPS} from "../../constants";
import history from "../../history";
import {decodeToken} from "../../common";
import DashboardTab from "./Partials/Partner/DashboardTab";
import PartnerCreditInformation from "./Partials/Partner/PartnerCreditInformation";

class PartnerDashboard extends Component {
	state = {
		selectedCustomer: '-1',
	};

	componentDidMount() {
		const {loadPartnerCustomers} = this.props;
		const userDetails = decodeToken();
		const partnerId = userDetails && userDetails.partner && userDetails.partner.id;
		loadPartnerCustomers(partnerId);

		const preSelectedCustomerId = localStorage.getItem('selectedCustomer');
		if (preSelectedCustomerId) {
			this.setState({'selectedCustomer': preSelectedCustomerId});
		}
	}

	navigateToPath = (path) => {
		history.push(path);
	};

	goToCustomerDetails = () => {
		const {selectedCustomer} = this.state;
		const {partnerCustomers} = this.props;

		const item = partnerCustomers.find(customer => customer.id === parseInt(selectedCustomer));
		// check which page to be redirected
		if (item) {
			const startedStep = item.logs && item.logs.find(log => log.status === CUSTOMER_APPLICATION_STATUS.STARTED);

			if (startedStep) {
				switch (startedStep.applicationStep) {
					case CUSTOMER_REGISTRATION_STEPS['2_SUBMIT_APPLICATION']:
						alert('customer haven\'t submitted registration steps yet');
						break;
					case CUSTOMER_REGISTRATION_STEPS['3_PARTNER_APPROVE_APPLICATION']:
						this.navigateToPath(`/approve-application/${selectedCustomer}`);
						break;
					case CUSTOMER_REGISTRATION_STEPS['8_SIGN_LOAN_DOCUMENTS']:
						this.navigateToPath(`/final-document-sign/${selectedCustomer}`);
						break;
					case CUSTOMER_REGISTRATION_STEPS['9_APPROVE_CREDIT']:
						alert('wait till mtaji will finish sign');
						break;
					default:
						alert('no action');
				}
			} else {
				const completedSteps = item.logs && item.logs.filter(log => log.status === CUSTOMER_APPLICATION_STATUS.COMPLETED);
				if (completedSteps && completedSteps.length === 5) {
					history.push({
						pathname: `/customer-overview/${selectedCustomer}`,
						from: '/partner-dashboard'
					});
				} else {
					alert('no action');
				}
			}
		}
	}

	render() {

		const {partnerCustomers} = this.props;
		const {selectedCustomer} = this.state;
		const userDetails = decodeToken();
		const partnerId = userDetails && userDetails.partner && userDetails.partner.id;
		const partnerName = userDetails && userDetails.partner && userDetails.partner.name;

		return (
			<div>
				<PartnerHeader/>
				<PageTitle title={`Welcome ${partnerName}`}/>
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
											partnerId={partnerId}
										/>
									</div>
								</div>
							</div>

							<div className='col-xl-8 col-lg-8'>
								<div className='card'>
									<div className='card-body'>
										<div className='row'>
											<div className='form-group col-md-4'>
												<select
													className="form-control"
													value={selectedCustomer}
													onChange={(e) => {
														this.setState({selectedCustomer: e.target.value});
														localStorage.setItem('selectedCustomer', e.target.value);
													}}
												>
													<option value='-1'>
														Select Customer
													</option>
													{
														partnerCustomers && partnerCustomers.map((customer, index) => (
															<option
																value={customer.id}
																key={index}
																// selected={selectedCustomer == customer.id}
															>{customer.tradingName}</option>
														))
													}
												</select>
											</div>

											<div className='form-group col-md-8'>
												<button
													className="btn btn-primary btn-block"
													disabled={selectedCustomer === '-1'}
													onClick={this.goToCustomerDetails}
												>
													GO TO CUSTOMER DETAILS
												</button>
											</div>
										</div>

										<div className='row'>
											<div className='col-md-12'>
												<DashboardTab
													partnerId={partnerId}
													customerId={selectedCustomer}
													visibleReadLeafIcon={true}
													visibleUpdateLeafIcon={false}
												/>
											</div>
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
}

const mapStateToProps = (state) => ({
	partnerCustomers: getPartnerCustomers(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadPartnerCustomers: loadPartnerCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PartnerDashboard);
