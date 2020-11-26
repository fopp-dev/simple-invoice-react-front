import React, {Component} from 'react';
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import PartnerHeader from "../Layout/PartnerHeader";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import CustomerRegisterForm from "./Forms/CustomerRegisterForm";

class CustomerRegister extends Component {
	state = {
		isSubmitting: false,
		success: false,
	};

	onChangeState = (value, key) => {
		this.setState({[key]: value});
	};

	render() {
		const {isSubmitting, success} = this.state;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<PartnerHeader/>
				<PageTitle title={'New Customer - Register(Account Creating)'}/>
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
						this.onChangeState(false, 'success');
						history.push('/partner-dashboard');
					}}
				/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title">Personal Information</h4>
									</div>
									<div className="card-body">
										<CustomerRegisterForm
											changeState={this.onChangeState}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CustomerRegister;
