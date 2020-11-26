import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FUTURE_TIME_PERIODS} from "../../../../constants";
import {bindActionCreators} from "redux";
import {loadFutureInstallmentsAction} from "../../../../redux/actions/partner";
import {getFutureInstallments} from "../../../../redux/selectors/partner";
import TreeView from "../../../Components/TreeView";
import * as moment from "moment";

/**
 * [
			{
				"name": "2020-10-07T00:00:00.000Z",
				"date": "2020-10-07T00:00:00.000Z",
				"children": [
					{
						"id": 1,
						"name": "Noul Sales",
						"children": [
							{
								"name": "3902390",
								"customer_id": 1,
								"customer_tradingName": "Noul Sales",
								"invoices_invoiceNumber": "3902390",
								"installments_id": 1,
								"installments_date": "2020-10-07T00:00:00.000Z",
								"installments_amount": "1000.00",
								"installments_paid": 1,
								"installments_comment": null,
								"installments_invoiceId": 1
							}
						]
					}
				]
			}
	 ]
 * @description table will look like above
 * @param installmentsData
 * @return {[]}
 */

export const makeTreeStructure = (installmentsData) => {
	let treeData = [];

	installmentsData && installmentsData.map(element => {
		const index = treeData.findIndex(item => item['date'] === element['installments_date']);
		if (index !== -1) {
			const subIndex = treeData[index]['children'].findIndex(item => item.id === element['customer_id'] && item.name === element['customer_tradingName']);

			if (subIndex !== -1) {
				treeData[index]['children'][subIndex]['children'].push({
					...element,
					name: `Invoice ${element['invoices_invoiceNumber']}`,
					amount: element['installments_remaining'],
				});
			} else {
				treeData[index]['children'].push({
					id: element['customer_id'],
					name: element['customer_tradingName'],
					children: [
						{
							name: `Invoice ${element['invoices_invoiceNumber']}`,
							amount: element['installments_remaining'],
							...element
						}
					]
				});
			}
		} else {
			treeData.push({
				name: moment(element['installments_date']).format('ll'),
				date: element['installments_date'],
				children: [{
					id: element['customer_id'],
					name: element['customer_tradingName'],
					children: [
						{
							name: `Invoice ${element['invoices_invoiceNumber']}`,
							amount: element['installments_remaining'],
							...element,
						}
					]
				}]
			});
		}
	});

	return treeData;
}

/**
 * @description repeated call that calculates the total amount of tree
 * @param data
 * @return {number}
 */
export const calculateAmount = (data) => {
	let amount = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].children) {
			const sum = calculateAmount(data[i].children);
			data[i]['amount'] = sum.toFixed(2);
			amount += sum;
		} else {
			amount += parseFloat(data[i].amount);
		}
	}

	return amount;
}

class FuturePayments extends Component {
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
			visibleReadLeafIcon,
			visibleUpdateLeafIcon,
			onClickCommentEdit,
		} = this.props;
		const {period} = this.state;
		const treeData = makeTreeStructure(futureInstallments);
		treeData && treeData.sort((a,  b) => {
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
				</div>
				<div className='row'>
					<div className='col-md-12 d-inline-flex flex-row justify-content-around'>
						<div style={{width: '30%'}}>
							<span className='font-weight-bold'>
								Date
							</span>
						</div>
						<div style={{width: '13%'}}>
							<span className='font-weight-bold'>
								Amount
							</span>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12 pt-3 pb-3'>
						{
							treeData && treeData.length > 0 ? (
								<TreeView
									data={treeData}
									visibleReadLeafIcon={visibleReadLeafIcon}
									visibleUpdateLeafIcon={visibleUpdateLeafIcon}
									onClickCommentEdit={onClickCommentEdit}
								/>
							) : (
								<span>No data to display</span>
							)
						}
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
)(FuturePayments);
