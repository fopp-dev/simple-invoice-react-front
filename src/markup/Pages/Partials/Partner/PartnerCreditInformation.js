import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getPartnerCreditInformation} from "../../../../redux/selectors/partner";
import {loadPartnerCreditInformationAction} from "../../../../redux/actions/partner";

class PartnerCreditInformation extends Component {
	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		const {
			partnerId,
			loadPartnerCreditInformation,
		} = this.props;

		if (partnerId !== '-1') {
			loadPartnerCreditInformation(partnerId);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {partnerId} = this.props;

		if (partnerId !== prevProps.partnerId) {
			this.loadData();
		}
	}

	render() {
		const {
			creditInformation,
			partnerId,
		} = this.props;

		return (
			<ul className="card-profile__info">
				<li className='d-flex justify-content-between'>
					<h5 className="text-dark mr-4">Total</h5>
					{
						partnerId !== '-1' && creditInformation && (
							<span>
								{(parseFloat(creditInformation.totalCredit).toFixed(2))} TZS
							</span>
						)
					}
				</li>
				<li className="mb-1 d-flex justify-content-between">
					<h5 className="text-dark mr-4">Used</h5>
					{
						partnerId !== '-1' && creditInformation && (
							<span>
							{parseFloat(creditInformation.totalCredit - creditInformation.remaining).toFixed(2)} TZS
							</span>
						)
					}
				</li>
				<li className='d-flex justify-content-between'>
					<h5 className="text-dark mr-4">Remaining</h5>
					{
						partnerId !== '-1' && creditInformation && (
							<span>
								{(parseFloat(creditInformation && creditInformation.remaining).toFixed(2))} TZS
							</span>
						)
					}
				</li>
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	creditInformation: getPartnerCreditInformation(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadPartnerCreditInformation: loadPartnerCreditInformationAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PartnerCreditInformation);
