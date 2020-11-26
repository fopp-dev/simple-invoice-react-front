import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getCreditChangeLog} from "../../../redux/selectors/common";
import {loadCreditChangeLogAction} from "../../../redux/actions/common";
import {get} from 'lodash';
import * as moment from "moment";

class CreditLogModalDialog extends Component {
	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		const {
			loadCreditChangeLog,
			customerId,
		} = this.props;

		loadCreditChangeLog(customerId);
	};

	render() {
		const {
			show,
			onClickOk,
			creditChangeLog,
		} = this.props;

		return (
			<Modal
				isOpen={show}
				size={'xl'}
				className={this.props.className}
			>
				<ModalHeader>
					Credit Log Of {get(creditChangeLog, '[0].customer.tradingName')}
				</ModalHeader>
				<ModalBody>
					<div className='row'>
						<div className='col-md-12'>
							<div className="transaction-table">
								<div className="table-responsive">
									<table className="table mb-0 table-responsive-sm table-striped table-bordered">
										<thead>
										<tr>
											<td className="pt-0 pb-0">
												<label>
													New credit
												</label>
											</td>
											<td className="pt-0 pb-0">
												<label>
													Old credit
												</label>
											</td>
											<td className="pt-0 pb-0">
												<label>
													Changed by
												</label>
											</td>
											<td className="pt-0 pb-0">
												<label>
													Date
												</label>
											</td>
											<td className="pt-0 pb-0">
												<label>
													Comment
												</label>
											</td>
										</tr>
										</thead>
										<tbody>
										{
											creditChangeLog && creditChangeLog.length > 0 ? (
												creditChangeLog.map((item, key) => (
													<tr key={key}>
														<td className="pt-0 pb-1 text-right">
															<label>
																{item.changeTo}
															</label>
														</td>
														<td className="pt-0 pb-1 text-right">
															<label>
																{item.changeFrom}
															</label>
														</td>
														<td className="pt-0 pb-1">
															<label>
																{item.user && item.user.name}
															</label>
														</td>
														<td className="pt-0 pb-1">
															<label>
																{moment(item.time).format('ll')}
															</label>
														</td>
														<td className="pt-0 pb-1">
															<label>
																{item.comment}
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
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={onClickOk}>
						Ok
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	creditChangeLog: getCreditChangeLog(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadCreditChangeLog: loadCreditChangeLogAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreditLogModalDialog);
