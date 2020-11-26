import React, {Component} from 'react';
import CustomerUploadDocumentsForm from "../Forms/CustomerUploadDocumentsForm";
import {getRole} from "../../../redux/selectors/auth";
import {connect} from 'react-redux';
import {userRoles} from "../../../constants";

class CustomerUploadDocuments extends Component {
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
				<CustomerUploadDocumentsForm
					id={customerId}
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
)(CustomerUploadDocuments);
