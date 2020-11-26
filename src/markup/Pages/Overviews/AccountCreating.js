import React, {Component} from 'react';
import {connect} from "react-redux";
import CustomerRegisterForm from "../Forms/CustomerRegisterForm";
import {getRole} from "../../../redux/selectors/auth";
import {userRoles} from "../../../constants";

class AccountCreating extends Component {
	isDisabled = () => {
		const {role} = this.props;

		return !(role === userRoles.mtaji_global_credit ||
			role === userRoles.mtaji_local_admin ||
			role === userRoles.mtaji_local_credit
		);
	}

	render() {
		const {match} = this.props;
		const customerId = match.params.id;

		return (
			<div className='row'>
				<CustomerRegisterForm
					id={customerId}
					disabled
				/>
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
)(AccountCreating);
