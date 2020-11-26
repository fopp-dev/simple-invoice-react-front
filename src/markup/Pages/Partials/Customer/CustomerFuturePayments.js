import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FUTURE_TIME_PERIODS} from "../../../../constants";
import {bindActionCreators} from "redux";
import {loadFutureInstallmentsAction} from "../../../../redux/actions/partner";
import {getFutureInstallments} from "../../../../redux/selectors/partner";
import * as moment from "moment";
import {makeTreeStructure, calculateAmount} from "../Partner/FuturePayments";

class CustomerFuturePayments extends Component {
	state = {
		period: FUTURE_TIME_PERIODS[0].gap,
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			customerId,
			partnerId,
		} = this.props;
		const {period} = this.state;

		if (prevProps.customerId !== customerId) {
			this.loadData();
		}

		if (prevProps.partnerId !== partnerId) {
			this.loadData();
		}

		if (prevState.period !== period) {
			this.loadData();
		}
	}

	loadData = () => {
		const {
			partnerId,
			customerId,
			loadFutureInstallments,
		} = this.props;
		const {period} = this.state;

		const startDate = moment().toISOString();
		const endDate = moment().add(period, 'days').toISOString();
		const data = {
			startDate,
			endDate,
		};

		loadFutureInstallments(partnerId, customerId, data);
	}

	render() {
		const periods = FUTURE_TIME_PERIODS;
		const {
			futureInstallments,
		} = this.props;
		const {period} = this.state;
		const treeData = makeTreeStructure(futureInstallments);
		treeData && treeData.sort((a, b) => {
			if (moment(a.date).isAfter(b.date)) {
				return 1;
			} else {
				return -1;
			}
		});
		calculateAmount(treeData);

		return (
			<>
				<div className='row'>
					<div className='form-group col-md-4'>
						<select
							className="form-control"
							name="period"
							value={period}
							onChange={(e) => this.setState({period: e.target.value})}
						>
							{
								periods && periods.map((item, key) => (
									<option value={item.gap} key={`overview-${key}`}>
										{item.title}
									</option>
								))
							}
						</select>
					</div>

					<div className='col-md-12'>
						<div className="transaction-table">
							<div className="table-responsive">
								<table className="table mb-0 table-responsive-sm table-borderless table-striped">
									<thead>
									<tr>
										<td className="pt-0 pb-0">
											<label>
												Date
											</label>
										</td>
										<td className="pt-0 pb-0">
											<label>
												Amount
											</label>
										</td>
									</tr>
									</thead>
									<tbody>
									{
										treeData && treeData.length > 0 ? (
											treeData.map((item, key) => (
												<tr key={key}>
													<td className="pt-0 pb-1">
														<label>
															{item.name}
														</label>
													</td>
													<td className="pt-0 pb-1">
														<label>
															{item.amount}
														</label>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan='5'>
													<label>
														No data to display
													</label>
												</td>
											</tr>
										)
									}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

			</>
		);
	}
}

const mapStateToProps = (state) => ({
	futureInstallments: getFutureInstallments(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadFutureInstallments: loadFutureInstallmentsAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CustomerFuturePayments);
