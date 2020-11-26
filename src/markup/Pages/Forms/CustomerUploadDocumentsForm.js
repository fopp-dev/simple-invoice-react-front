import React, {Component} from 'react';
import {companyDocuments, personDocuments} from "../../../constants";
import {bindActionCreators} from "redux";
import {saveStepFourAction} from "../../../redux/actions/customer";
import {connect} from "react-redux";
import {uploadFile} from "../../../http/http-calls";
import {decodeToken} from "../../../common";
import {getCustomerDocuments} from "../../../redux/selectors/common";
import {loadCustomerDocuments} from "../../../redux/actions/common";
import history from "../../../history";

class CustomerUploadDocumentsForm extends Component {
	state = {
		submitted: false,
		isSubmitting: false,
		documents: this.props.customerDocuments && this.props.customerDocuments.documents,
		persons: this.props.customerDocuments && this.props.customerDocuments.persons,
	};

	componentDidMount() {
		const {
			// loadCustomerDocuments,
			loadCustomerDocuments,
			id,
		} = this.props;

		// this is customer overview page
		if (id) {
			loadCustomerDocuments(id);
		} else {
			const detail = decodeToken();
			if (detail && detail.customer && detail.customer.id) {
				loadCustomerDocuments(detail.customer.id);
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			customerDocuments,
		} = this.props;

		if (prevProps.customerDocuments !== customerDocuments) {
			this.setState({
				documents: customerDocuments.documents,
				persons: customerDocuments.persons
			});
		}
	}

	changeFile = async (e, fileName, stateName) => {
		const originName = (e.target['files'][0].name);

		const payload = new FormData();
		payload.append('file', e.target['files'][0], originName);

		try {
			const res = await uploadFile(payload);
			const data = JSON.parse(JSON.stringify(this.state[stateName]));
			const exist = data && data.findIndex((item) => {
				return item.name === fileName;
			});

			const newItem = {
				name: fileName,
				filenameOriginal: originName,
				filename: res.path
			};

			if (exist !== -1) {
				data.splice(exist, 1, newItem);
			} else {
				data.push(newItem);
			}
			this.setState({[stateName]: data});
		} catch (e) {
			console.error(e);
		}
	};

	changePersonFile = async (e, fileName, stateName, index) => {
		const originName = (e.target['files'][0].name);

		const payload = new FormData();
		payload.append('file', e.target['files'][0], originName);

		try {
			const res = await uploadFile(payload);
			const data = JSON.parse(JSON.stringify(this.state[stateName]));
			const subData = data[index];
			const exist = subData && subData.documents.findIndex((item) => {
				return item.name === fileName;
			});

			const newItem = {
				name: fileName,
				filenameOriginal: originName,
				filename: res.path
			};

			if (exist !== -1) {
				subData.documents.splice(exist, 1, newItem);
			} else {
				subData.documents.push(newItem);
			}

			data.splice(index, 1, subData);
			this.setState({[stateName]: data});
		} catch (e) {
			console.error(e);
		}
	};

	getMappedDocument = (name, documents) => {
		const entity = documents && documents.find((item) => {
			return item.name === name;
		});

		return entity && entity.filenameOriginal;
	};

	setSubmitting = () => {
		this.setState({isSubmitting: true});
	}

	submit = () => {
		this.setState({submitted: true});

		const {documents, persons} = this.state;

		if ((documents && documents.length) !== (companyDocuments && companyDocuments.length)) {
			return false; // user have not selected all customer documents
		}

		if (!this.allPersonsDocumentsSelected()) {
			return false; // user have not selected all persons documents
		}

		const {saveStepFour, fromOverview} = this.props;
		this.setSubmitting(true);

		let pathInfo = {};

		if (fromOverview) {
			const {id} = this.props;
			if (id) {
				saveStepFour(
					id,
					{
						documents,
						persons
					},
					pathInfo
				);
			}
		} else {
			pathInfo = {
				from: '/customer-step4',
				pathname: '/customer-step5',
			};
			const userDetails = decodeToken();
			if (userDetails && userDetails.customer && userDetails.customer.id) {
				const customerId = userDetails.customer.id;
				saveStepFour(
					customerId,
					{
						documents,
						persons
					},
					pathInfo
				);
			}
		}
	};

	navigateTo = (path) => {
		history.push({
			pathname: path,
			from: '/customer-step4'
		});
	};

	allPersonsDocumentsSelected = () => {
		const {persons} = this.state;

		const exist = persons && persons.findIndex((item) => {
			return item.documents.length !== (personDocuments && personDocuments.length);
		});

		return exist === -1;
	};

	render() {
		const {documents, persons, submitted} = this.state;
		const {
			customerDocuments,
			disabled,
			fromOverview,
		} = this.props;
		const data = customerDocuments;

		return (
			<div className='col-md-12'>
				<div className="form-row">
					<div className="form-group col-xl-12">
						<div className="row">
							<div className="col-md-12">
								<label className="mr-sm-2 mt-2">Company
									- {data && data.tradingName}</label>
							</div>
						</div>
					</div>
				</div>

				{
					companyDocuments && companyDocuments.map((document, index) => (
						<div className="form-row" key={`company-document-${index}`}>
							<div className="form-group col-xl-12">
								<div className="row">
									<div className="col-md-3">
										<label className="mr-sm-2 mt-2">{document}*</label>
									</div>

									<div className="col-md-5">
										<div
											className="file-upload-wrapper"
											data-text={this.getMappedDocument(document, documents)}
										>
											<input
												name="file-upload-field"
												type="file"
												disabled={disabled}
												className="file-upload-field"
												accept=".pdf,.doc,.jpg,.png"
												onChange={(e) => this.changeFile(e, document, 'documents')}
											/>
										</div>
										{
											!this.getMappedDocument(document, documents) && submitted && (
												<div className="invalid-feedback"
														 style={{display: 'block'}}>Select File</div>
											)
										}
									</div>
								</div>
							</div>
						</div>
					))
				}
				{/* new section */}
				{
					persons && persons.map((person, personKey) => (
						<div key={`person-${personKey}`}>
							<div className="form-row">
								<div className="form-group col-xl-12">
									<div className="row">
										<div className="col-md-12">
											<label className="mr-sm-2 mt-2">{person.firstName} {person.lastName}</label>
										</div>
									</div>
								</div>
							</div>
							{
								personDocuments && personDocuments.map((document, key) => (
									<div className="form-row" key={`person-document-${key}`}>
										<div className="form-group col-xl-12">
											<div className="row">
												<div className="col-md-3">
													<label className="mr-sm-2 mt-2">{document}*</label>
												</div>

												<div className="col-md-5">
													<div
														className="file-upload-wrapper"
														data-text={this.getMappedDocument(document, person.documents)}
													>
														<input
															name="file-upload-field"
															type="file"
															disabled={disabled}
															className="file-upload-field"
															accept=".pdf,.doc,.jpg,.png"
															onChange={(e) => this.changePersonFile(e, document, 'persons', personKey)}
														/>
													</div>
													{
														!this.getMappedDocument(document, person.documents) && submitted && (
															<div className="invalid-feedback"
																	 style={{display: 'block'}}>Select File</div>
														)
													}
												</div>
											</div>
										</div>
									</div>
								))
							}
						</div>
					))
				}

				{
					!disabled && (
						fromOverview ? (
							<div className="form-row mt-3">
								<div className="form-group col-12 text-center">
									<button
										className="btn btn-success pl-5 pr-5 mb-2"
										type="button"
										onClick={() => this.submit()}
									>
										Save
									</button>
								</div>
							</div>
						) : (
							<div className="form-row mt-3">
								<div className="form-group col-12 text-center">
									<button
										className="btn btn-primary pl-5 pr-5 mr-2 mb-2"
										type="button"
										onClick={() => this.navigateTo('customer-step3')}
									>
										GO BACK
									</button>
									<button
										className="btn btn-success pl-5 pr-5 mb-2"
										type="button"
										onClick={() => this.submit()}
									>
										NEXT STEP
									</button>
								</div>
							</div>
						)
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	customerDocuments: getCustomerDocuments(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			loadCustomerDocuments: loadCustomerDocuments,
			saveStepFour: saveStepFourAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomerUploadDocumentsForm);
