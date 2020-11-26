import React, {Component} from 'react';
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import PartnerHeader from "../Layout/PartnerHeader";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import FinalSignForm from "./Forms/FinalSignForm";

class FinalDocumentSign extends Component {
	state = {
		isSubmitting: false,
		success: false,
	};

	changeState = (value, key) => {
		this.setState({[key]: value});
	};

	render() {
		const {isSubmitting, success} = this.state;
		const {match} = this.props;
		const customerId = match.params.id;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<ModalDialog
					show={success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						'Mtaji Global Credit will check your approve.'
					)}
					okText={'Ok'}
					onClickOk={() => {
						this.changeState(false, 'success');
						history.push({
							pathname: '/partner-dashboard',
							from: `/final-document-sign/${customerId}`
						})
					}}
				/>
				<PartnerHeader/>
				<PageTitle title={'New Customer - Approve Application (Sign Off)'}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title"/>
									</div>
									<div className="card-body">
										<FinalSignForm
											changeState={this.changeState}
											match={this.props.match}
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

export default FinalDocumentSign;
