import React, {Component} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import FuturePayments from "./FuturePayments";
import PastPayments from "./PastPayments";
import Invoices from "../Invoices";
import classnames from 'classnames';
import InstallmentCommentModal from "../../Modals/InstallmentCommentModal";

class DashboardTab extends Component {
	state = {
		activeTab: '1',
		visibleCommentModal: false,
		selectedInstallmentId: null,
		selectedInstallmentComment: '',
		commentEditable: false,
	};

	onClickCommentEdit = (id, comment, editable) => {
		this.setState({
			selectedInstallmentId: id,
			selectedInstallmentComment: comment || '',
			visibleCommentModal: true,
			commentEditable: editable,
		});
	}

	render() {
		const {
			partnerId,
			customerId,
			visibleReadLeafIcon,
			visibleUpdateLeafIcon,
		} = this.props;

		const {
			selectedInstallmentId,
			selectedInstallmentComment,
			visibleCommentModal,
			commentEditable,
		} = this.state;

		const {activeTab} = this.state;
		const toggle = tab => {
			if (activeTab !== tab) this.setState({activeTab: tab});
		}

		return (
			<div className='partner-dashboard-tab'>
				<InstallmentCommentModal
					show={visibleCommentModal}
					onClickCancel={() => this.setState({visibleCommentModal: false})}
					id={selectedInstallmentId}
					comment={selectedInstallmentComment}
					editable={commentEditable}
				/>
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
									<FuturePayments
										partnerId={partnerId}
										customerId={customerId}
										visibleReadLeafIcon={visibleReadLeafIcon}
										visibleUpdateLeafIcon={visibleUpdateLeafIcon}
										onClickCommentEdit={this.onClickCommentEdit}
									/>
								</TabPane>

								<TabPane tabId='2'>
									<PastPayments
										partnerId={partnerId}
										customerId={customerId}
										visibleReadLeafIcon={visibleReadLeafIcon}
										visibleUpdateLeafIcon={visibleUpdateLeafIcon}
										onClickCommentEdit={this.onClickCommentEdit}
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

export default DashboardTab;
