import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PAST_TIME_PERIODS} from "../../../../constants";
import {bindActionCreators} from "redux";
import {loadPastInstallmentsAction} from "../../../../redux/actions/partner";
import {getPastInstallments} from "../../../../redux/selectors/partner";
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
								"invoice_invoiceNumber": "3902390",
								"installment_id": 1,
								"installment_comment": null,
								"payments_date": 2020-10-08T00:00:00.000Z,
								"paymentInstallments_id": 109,
								"paymentInstallments_amount": '50.00',
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
		const index = treeData.findIndex(item => item['date'] === element['payments_date']);
		if (index !== -1) {
			const subIndex = treeData[index]['children'].findIndex(item => item.id === element['customer_id'] && item.name === element['customer_tradingName']);

			if (subIndex !== -1) {
				treeData[index]['children'][subIndex]['children'].push({
					...element,
					name: `Invoice ${element['invoice_invoiceNumber']}`,
					amount: element['paymentInstallments_amount'],
				});
			} else {
				treeData[index]['children'].push({
					id: element['customer_id'],
					name: element['customer_tradingName'],
					children: [
						{
							name: `Invoice ${element['invoice_invoiceNumber']}`,
							amount: element['paymentInstallments_amount'],
							...element
						}
					]
				});
			}
		} else {
			treeData.push({
				name: moment(element['payments_date']).format('ll'),
				date: element['payments_date'],
				children: [{
					id: element['customer_id'],
					name: element['customer_tradingName'],
					children: [
						{
							name: `Invoice ${element['invoice_invoiceNumber']}`,
							amount: element['paymentInstallments_amount'],
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

class PastPayments extends Component {
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

		if (partnerId !== prevProps.partnerId) {
			this.loadData();
		}

		if (customerId !== prevProps.customerId) {
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
			loadPastInstallments,
		} = this.props;
		const {period} = this.state;

		const startDate = moment().add(period, 'days').toISOString();
		const endDate = moment().toISOString();
		const data = {
			startDate,
			endDate,
		};

		loadPastInstallments(partnerId, customerId, data);
	}

	render() {
		const periods = PAST_TIME_PERIODS;
		const {
			pastInstallments,
			visibleReadLeafIcon,
			visibleUpdateLeafIcon,
			onClickCommentEdit,
		} = this.props;
		const {period} = this.state;
		const treeData = makeTreeStructure(pastInstallments);
		treeData && treeData.sort((a,  b) => {
			if (moment(a.date).isAfter(b.date)) {
				return -1;
			} else {
				return 1;
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
	pastInstallments: getPastInstallments(state,)
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadPastInstallments: loadPastInstallmentsAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PastPayments);
