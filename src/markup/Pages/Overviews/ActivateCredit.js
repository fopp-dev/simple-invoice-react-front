import React, {Component} from 'react';
import ActivateCreditForm from "../Forms/ActivateCreditForm";
import {getRole} from "../../../redux/selectors/auth";
import {connect} from "react-redux";
import {userRoles} from "../../../constants";

class ActivateCredit extends Component {
	isDisabled = () => {
		const {role} = this.props;

		return !(role === userRoles.mtaji_global_credit ||
			role === userRoles.mtaji_local_admin ||
			role === userRoles.mtaji_local_credit
		);
	}

	render() {
		return (
			<ActivateCreditForm
				match={this.props.match}
				disabled={true}
				fromOverview
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	role: getRole(state),
});

export default connect(
	mapStateToProps,
	null
)(ActivateCredit);
