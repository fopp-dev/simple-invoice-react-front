import React, {Component} from 'react';
import {getRole} from "../../../redux/selectors/auth";
import {connect} from 'react-redux';
import {userRoles} from "../../../constants";
import history from "../../../history";
import CreditLogModalDialog from "../Modals/CreditLogModal";

class CustomerOverviewNavigation extends Component {
	state = {
		visibleModal: false,
	};

	setVisibleModal = (value) => {
		this.setState({visibleModal: value});
	};

	navigateTo = (path) => {
		history.push(path);
	};

	render() {
		const {
			role,
			id,
		} = this.props;
		const {visibleModal} = this.state;

		return (
			<div className='row p-3'>
				<CreditLogModalDialog
					customerId={id}
					show={visibleModal}
					onClickOk={() => this.setVisibleModal(false)}
				/>
				{
					(
						role === userRoles.mtaji_global_credit ||
						role === userRoles.mtaji_local_credit ||
						role === userRoles.mtaji_local_admin ||
						role === userRoles.partner
					) &&
					<div className='col-md-4'>
						<button className='btn btn-info btn-block' onClick={() => this.setVisibleModal(true)}>
							SHOW CHANGE LOG
						</button>
					</div>
				}
				{
					role === userRoles.partner &&
					<div className='col-md-4'>
						<button className='btn btn-info btn-block' onClick={() => this.navigateTo(`/register-sales/${id}`)}>
							REGISTER CUSTOMER SALES INVOICE
						</button>
					</div>
				}
				{
					role === userRoles.partner &&
					<div className='col-md-4'>
						<button className='btn btn-info btn-block' onClick={() => this.navigateTo(`/register-payment/${id}`)}>
							REGISTER CUSTOMER PAYMENT
						</button>
					</div>
				}
				{
					(
						role === userRoles.mtaji_global_credit ||
						role === userRoles.mtaji_local_credit
					) &&
					<div className='col-md-4'>
						<button className='btn btn-info btn-block' onClick={() => this.navigateTo(`/close-credit/${id}`)}>
							TEMPORARY CLOSE OF CREDIT
						</button>
					</div>
				}
				{
					role === userRoles.mtaji_global_credit &&
					<div className='col-md-4'>
						<button className='btn btn-info btn-block' onClick={() => this.navigateTo(`/change-credit/${id}`)}>
							CHANGE CREDIT
						</button>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	role: getRole(state),
});

export default connect(
	mapStateToProps,
	null,
)(CustomerOverviewNavigation);
