import React, {Component} from 'react';
import FinalSignForm from "../Forms/FinalSignForm";
import {userRoles} from "../../../constants";
import {getRole} from "../../../redux/selectors/auth";
import {connect} from "react-redux";

class FinalSign extends Component {
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
				<FinalSignForm
					match={this.props.match}
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
)(FinalSign);
