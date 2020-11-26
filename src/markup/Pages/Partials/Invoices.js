import React, {Component} from 'react';
import {PAST_TIME_PERIODS} from "../../../constants";
import {getInvoices} from "../../../redux/selectors/partner";
import {bindActionCreators} from "redux";
import {loadInvoicesAction} from "../../../redux/actions/partner";
import {connect} from "react-redux";
import * as moment from "moment";

class Invoices extends Component {
	state = {
		period: PAST_TIME_PERIODS[0].gap,
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			partnerId,
			customerId,
		} = this.props;
		const {period} = this.state;

		if (prevProps.partnerId !== partnerId) {
			this.loadData();
		}

		if (prevProps.customerId !== customerId) {
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
			loadInvoices,
		} = this.props;
		const {period} = this.state;

		const startDate = moment().add(period, 'days').toISOString();
		const endDate = moment().toISOString();
		const data = {
			startDate,
			endDate,
		};

		loadInvoices(partnerId, customerId, data);
	}

	render() {
		const periods = PAST_TIME_PERIODS;
		const {invoices} = this.props;
		const {period} = this.state;

		return (
			<>
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
				<div className="form-group col-xl-12">
					<div className="transaction-table">
						<div className="table-responsive">
							<table className="table mb-0 table-responsive-sm table-borderless table-striped">
								<thead>
								<tr>
									<td className="pt-0 pb-0">
										<label>
											Invoice
										</label>
									</td>
									<td className="pt-0 pb-0">
										<label>
											Date
										</label>
									</td>
									<td className="pt-0 pb-0">
										<label>
											Customer
										</label>
									</td>
									<td className="pt-0 pb-0 text-right">
										Amount
									</td>
									<td className="pt-0 pb-0 text-right">
										Remaining
									</td>
								</tr>
								</thead>

								<tbody>
								{
									invoices && invoices.length > 0 ?
										invoices.map((invoice, key) => (
											<tr key={key}>
												<td className="pt-0 pb-1">
													<span>{invoice.invoiceNumber}</span>
												</td>
												<td className="pt-0 pb-1">
													<span>{moment(invoice.date).format('ll')}</span>
												</td>
												<td className="pt-0 pb-1">
													<span>{invoice.customer && invoice.customer.tradingName}</span>
												</td>
												<td className="pt-0 pb-1 text-right">
													<span>{invoice.amount}</span>
												</td>
												<td className="pt-0 pb-1 text-right">
													<span>{invoice.remaining}</span>
												</td>
											</tr>
										)) : (
											<tr>
												<td className="pt-0 pb-1">
													<span>No data to display</span>
												</td>
											</tr>
										)
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	invoices: getInvoices(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadInvoices: loadInvoicesAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Invoices);
