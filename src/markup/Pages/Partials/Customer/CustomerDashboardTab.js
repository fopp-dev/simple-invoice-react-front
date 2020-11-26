import React, {Component} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import Invoices from "../Invoices";
import classnames from 'classnames';
import CustomerFuturePayments from "./CustomerFuturePayments";
import CustomerPastPayments from "./CustomerPastPayments";

class CustomerDashboardTab extends Component {
	state = {
		activeTab: '1',
	};

	render() {
		const {
			partnerId,
			customerId,
		} = this.props;

		const {activeTab} = this.state;
		const toggle = tab => {
			if (activeTab !== tab) this.setState({activeTab: tab});
		}

		return (
			<div className='partner-dashboard-tab'>
				{
					partnerId !== '-1' && (
						<>
							<Nav tabs>
								<NavItem>
									<NavLink
										className={classnames({active: activeTab === '1'})}
										onClick={() => {
											toggle('1');
										}}>
										Future Payments
									</NavLink>
								</NavItem>

								<NavItem>
									<NavLink
										className={classnames({active: activeTab === '2'})}
										onClick={() => {
											toggle('2');
										}}>
										Payment History
									</NavLink>
								</NavItem>

								<NavItem>
									<NavLink
										className={classnames({active: activeTab === '3'})}
										onClick={() => {
											toggle('3');
										}}>
										Invoices
									</NavLink>
								</NavItem>
							</Nav>

							<TabContent activeTab={activeTab}>
								<TabPane tabId='1'>
									<CustomerFuturePayments
										partnerId={partnerId}
										customerId={customerId}
									/>
								</TabPane>

								<TabPane tabId='2'>
									<CustomerPastPayments
										partnerId={partnerId}
										customerId={customerId}
									/>
								</TabPane>

								<TabPane tabId='3'>
									<Invoices
										partnerId={partnerId}
										customerId={customerId}
									/>
								</TabPane>
							</TabContent>
						</>
					)
				}
			</div>
		)
	}
}

export default CustomerDashboardTab;
