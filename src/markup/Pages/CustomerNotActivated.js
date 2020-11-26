import React, {Component} from 'react';
import PageTitle from './../Pages/PageTitle';
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";
import history from "../../history";

class CustomerNotActivated extends Component {
	signout = () => {
		localStorage.clear();

		history.push('/signin');
	};

	render() {

		return (
			<div>
				<CustomerNotActivatedHeader/>
				<PageTitle title={''}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title"/>
									</div>
									<div className="card-body">
										<div className='row text-center'>
											<div className='col-md-12 mb-5'>
											<span>
											Your customer account is being in processing for approve.
											<br/>
											<br/>
											Please wait till we will send you notification.
											</span>
											</div>

											<div className='col-md-12'>
												<button className='btn btn-primary' onClick={this.signout}>
													Logout
												</button>
											</div>
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

export default CustomerNotActivated;
