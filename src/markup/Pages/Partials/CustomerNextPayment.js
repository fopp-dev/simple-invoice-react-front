import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadNextPaymentAction} from "../../../redux/actions/customer";
import {getNextPaymemt} from "../../../redux/selectors/customer";
import * as moment from "moment";

class CustomerNextPayment extends Component {
	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {customerId} = this.props;

		if (customerId !== prevProps.customerId) {
			this.loadData();
		}
	}

	loadData = () => {
		const {
			customerId,
			loadNextPayment
		} = this.props;

		if (customerId !== '-1') {
			loadNextPayment(customerId);
		}
	}

	render() {
		const {
			nextPayment,
			customerId,
		} = this.props;

		return (
			<ul className="card-profile__info">
				<li className='d-flex justify-content-between'>
					<h5 className="text-dark mr-4">Due Date</h5>
					{
						customerId !== '-1' && nextPayment && (
							<span>
								{
									moment(nextPayment.installmentDate).format('ll')
								}
							</span>
						)
					}
				</li>
				<li className="mb-1 d-flex justify-content-between">
					<h5 className="text-dark mr-4">Amount</h5>
					{
						customerId !== '-1' && nextPayment && (
							<span>
								{nextPayment.nextRemaining || 0.00} TZS
							</span>
						)
					}
				</li>
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	nextPayment: getNextPaymemt(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadNextPayment: loadNextPaymentAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomerNextPayment);
