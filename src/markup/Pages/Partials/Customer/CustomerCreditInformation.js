import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getCustomerCreditInformation} from "../../../../redux/selectors/customer";
import {loadCustomerCreditInformationAction} from "../../../../redux/actions/customer";

class CustomerCreditInformation extends Component{
	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		const {
			customerId,
			loadCustomerCreditInformation,
		} = this.props;

		if (customerId !== '-1') {
			loadCustomerCreditInformation(customerId);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {customerId} = this.props;

		if (customerId !== prevProps.customerId) {
			this.loadData();
		}
	}

	render() {
		const {
			creditInformation,
			customerId,
		} = this.props;

		return (
			<ul className="card-profile__info">
				<li className='d-flex justify-content-between'>
					<h5 className="text-dark mr-4">Total</h5>
					{
						customerId !== '-1' && creditInformation && (
							<span>
								{(parseFloat(creditInformation.totalCredit).toFixed(2))} TZS
							</span>
						)
					}
				</li>
				<li className="mb-1 d-flex justify-content-between">
					<h5 className="text-dark mr-4">Used</h5>
					{
						customerId !== '-1' && creditInformation && (
							<span>
								{parseFloat(creditInformation.totalCredit - creditInformation.remaining).toFixed(2)} TZS
							</span>
						)
					}
				</li>
				<li className='d-flex justify-content-between'>
					<h5 className="text-dark mr-4">Remaining</h5>
					{
						customerId !== '-1' && creditInformation && (
							<span>
								{(parseFloat(creditInformation.remaining).toFixed(2))} TZS
							</span>
						)
					}
				</li>
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	creditInformation: getCustomerCreditInformation(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadCustomerCreditInformation: loadCustomerCreditInformationAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomerCreditInformation);
