import React, {Component} from 'react';
import SignOffForm from "../Forms/SignOffForm";
import {getRole} from "../../../redux/selectors/auth";
import {userRoles} from "../../../constants";
import {connect} from "react-redux";

class SignOff extends Component {
	isDisabled = () => {
		const {role} = this.props;

		return !(role === userRoles.mtaji_global_credit ||
			role === userRoles.mtaji_local_admin ||
			role === userRoles.mtaji_local_credit
		);
	}

	render() {
		return (
			<div className='row'>
				<SignOffForm
					customerId={this.props.match.params.id}
					disabled={this.isDisabled()}
					fromOverview
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
	null
)(SignOff);
