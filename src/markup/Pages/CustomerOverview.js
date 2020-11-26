import React, {Component} from 'react'
import PageTitle from './../Pages/PageTitle';
import {connect} from "react-redux";
import { Route, Switch, Redirect} from 'react-router-dom';
import CustomerRegistrationFlow from "../Layout/CustomerRegistrationFlow";
import AccountCreating from "./Overviews/AccountCreating";
import CustomerUploadDocuments from "./Overviews/CustomerUploadDocuments";
import SignOff from "./Overviews/SignOff";
import FinalSign from "./Overviews/FinalSign";
import ActivateCredit from "./Overviews/ActivateCredit";
import CustomerOverviewHeader from "../Layout/CustomerOverviewHeader";
import CustomerOverviewNavigation from "./Partials/CustomerOverviewNavigation";
import {getCustomerMain} from "../../redux/selectors/common";
import {bindActionCreators} from "redux";
import {loadCustomerMain} from "../../redux/actions/common";

class CustomerOverview extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		const {loadCustomerMain} = this.props;

		if (id) {
			loadCustomerMain(id);
		}
	}

	render() {
		const id = this.props.match.params.id;
		const {customerMain} = this.props;

		return (
			<div>
				<CustomerOverviewHeader/>
				<PageTitle title={`Customer Overview: ${(customerMain && customerMain.tradingName) || ''}`}/>
				<div className="homepage mb-80">
					<div className="container">
						<div className='row'>
							<div className='col-md-12'>
								<CustomerOverviewNavigation
									id={id}
								/>
							</div>
						</div>

						<div className='row'>
							<div className='col-xl-12'>
								{/*customer step navigation area*/}
								<CustomerRegistrationFlow
									id={id}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-xl-12'>
								<div className='card'>
									<div className='card-body'>
										<Switch>
											<Route
												path='/customer-overview/:id/account-creating'
												component={AccountCreating}
											/>
											<Route
												path='/customer-overview/:id/upload-documents'
												component={CustomerUploadDocuments}
											/>
											<Route
												path='/customer-overview/:id/sign-off'
												component={SignOff}
											/>
											<Route
												path='/customer-overview/:id/final-sign'
												component={FinalSign}
											/>
											<Route
												path='/customer-overview/:id/activate-credit'
												component={ActivateCredit}
											/>
											<Redirect to='/customer-overview/:id/account-creating'/>
										</Switch>
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
	customerMain: getCustomerMain(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CustomerOverview);
