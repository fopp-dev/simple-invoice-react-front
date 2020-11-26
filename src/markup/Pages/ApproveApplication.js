import React, {Component} from 'react';
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import PartnerHeader from "../Layout/PartnerHeader";
import SignOffForm from "./Forms/SignOffForm";

class ApproveApplication extends Component {
	state ={
		isSubmitting: false,
	};

	render() {
		const {
			isSubmitting,
		} = this.state;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
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
										<div className='row'>
											<SignOffForm
												customerId={this.props.match.params.id}
											/>
										</div>
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

export default ApproveApplication;
