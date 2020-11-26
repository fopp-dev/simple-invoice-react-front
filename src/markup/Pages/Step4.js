import React, {Component} from 'react';
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";
import CustomerUploadDocumentsForm from "./Forms/CustomerUploadDocumentsForm";

class Step4 extends Component {
	state = {
		isSubmitting: false,
	};

	setSubmitting = (value) => {
		this.setState({isSubmitting: value});
	};

	render() {
		const {isSubmitting} = this.state;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<CustomerNotActivatedHeader/>
				<PageTitle title={''}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title">
											Step 4 of 5 - Documents
										</h4>
									</div>
									<div className="card-body">
										<CustomerUploadDocumentsForm
											setSubmitting={this.setSubmitting}
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

export default Step4;
