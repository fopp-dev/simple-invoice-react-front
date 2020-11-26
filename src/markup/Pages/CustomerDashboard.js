import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CustomerHeader from "../Layout/CustomerHeader";
import PageTitle from "./PageTitle";
import {decodeToken} from "../../common";
import CustomerCreditInformation from "./Partials/Customer/CustomerCreditInformation";
import CustomerNextPayment from "./Partials/CustomerNextPayment";
import CustomerDashboardTab from "./Partials/Customer/CustomerDashboardTab";

class CustomerDashboard extends Component {
	render() {
		const userDetails = decodeToken();
		let customerId, tradingName, partnerId;
		if (userDetails && userDetails.customer && userDetails.customer.id) {
			customerId = userDetails.customer.id;
			tradingName = userDetails.customer.tradingName;

			if (userDetails.customer.partner && userDetails.customer.partner.id) {
				partnerId = userDetails.customer.partner.id;
			}
		}

		return (
			<div>
				<CustomerHeader/>
				<PageTitle title={`Welcome ${tradingName}`}/>
				<div className="homepage mb-80">
					<div className="container">
						<div className='row'>
							<div className='col-xl-4 col-lg-4'>
								<div className="card profile_card">
									<div className='card-header'>
										<h4>Next Payment</h4>
									</div>
									<div className="card-body">
										<CustomerNextPayment
											customerId={customerId}
										/>
									</div>
								</div>

								<div className="card profile_card">
									<div className='card-header'>
										<h4>Customer Credit Limit</h4>
									</div>
									<div className="card-body">
										<CustomerCreditInformation
											customerId={customerId}
										/>
									</div>
								</div>
							</div>

							<div className='col-xl-8 col-lg-8'>
								<div className='card'>
									<div className='card-body'>
										<CustomerDashboardTab
											partnerId={partnerId}
											customerId={customerId}
										/>
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

});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({

		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CustomerDashboard);
