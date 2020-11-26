import React, {Component} from 'react';
import {getAllCustomers} from "../../../redux/selectors/mtaji";
import {bindActionCreators} from "redux";
import {loadAllCustomersAction} from "../../../redux/actions/matji";
import {connect} from "react-redux";
import {activateCustomer} from "../../../http/http-calls";
import ModalDialog from "../../Components/Modal";
import history from "../../../history";
import Backdrop from "../../Components/Backdrop";

class ActivateCreditForm extends Component {
	state = {
		isSubmitting: false,
		success: false,
	};

	componentDidMount() {
		const {loadAllCustomers} = this.props;
		loadAllCustomers();
	}

	activateCredit = async () => {
		const {match} = this.props;
		const customerId = match.params.id;

		try {
			this.setState({
				isSubmitting: true,
			});
			await activateCustomer(customerId);
			this.setState({
				success: true,
			});
			this.setState({
				isSubmitting: false,
			});
		} catch (e) {
			this.setState({
				isSubmitting: false,
			});
			console.log(e.response.data);
		}
	};

	render() {
		const {isSubmitting, success} = this.state;
		const {customers, match, disabled} = this.props;
		const customerId = match.params.id;
		const selectedCustomer = customers && customers.find((customer) => {
			return customer.id === parseInt(customerId);
		});

		return (
			<>
				<ModalDialog
					show={success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						'Email sent to customer successfully'
					)}
					okText={'Ok'}
					onClickOk={() => {
						this.setState({success: false});
						history.push({pathname: '/mtaji-dashboard'});
					}}
				/>
				<Backdrop show={isSubmitting}/>

				<div className='row'>
					<div className='col-md-3 mb-1 form-group'>
						<label>Customer</label>
					</div>
					<div className='col-md-9'>
						{selectedCustomer && selectedCustomer.tradingName}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-3 mb-1 form-group'>
						<label>Contact Name</label>
					</div>
					<div className='col-md-9'>
						{
							selectedCustomer && selectedCustomer.users && selectedCustomer.users[0].name
						}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-3 mb-1 form-group'>
						<label>Credit</label>
					</div>
					<div className='col-md-9'>
						{selectedCustomer && (selectedCustomer.approvedCreditLimit || selectedCustomer.suggestedCredit) + ' TZS'}
					</div>
				</div>

				{
					!disabled && (
						<div className='row form-row mt-3'>
							<div className='col-md-12 text-center'>
								<button
									className='btn btn-success'
									onClick={this.activateCredit}
								>
									Activate Credit Line
								</button>
							</div>
						</div>
					)
				}
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	customers: getAllCustomers(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadAllCustomers: loadAllCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivateCreditForm);

