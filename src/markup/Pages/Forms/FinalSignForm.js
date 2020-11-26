import React, {Component} from 'react';
import {companyDocuments, CUSTOMER_REGISTRATION_STEPS, personDocuments} from "../../../constants";
import {getCustomerDocuments, getCustomerMain} from "../../../redux/selectors/common";
import {bindActionCreators} from "redux";
import {loadCustomerDocuments, loadCustomerMain} from "../../../redux/actions/common";
import {connect} from "react-redux";
import {submitDocuments, uploadFile} from "../../../http/http-calls";
import history from "../../../history";

class FinalSignForm extends Component {
	state = {
		isSubmitting: false,
		success: false,
		submitted: false,
		documents: this.props.customerDocuments && this.props.customerDocuments.finalDocuments,
		persons: this.props.customerDocuments && this.props.customerDocuments.finalPersons,
	};

	componentDidMount() {
		const {
			match,
			loadCustomerMain,
			loadCustomerDocuments,
		} = this.props;
		const customerId = match.params.id;

		if (customerId) {
			loadCustomerMain(customerId);
			loadCustomerDocuments(customerId);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {customerDocuments} = this.props;

		if ((customerDocuments !== prevProps.customerDocuments)) {
			this.setState({documents: customerDocuments && customerDocuments.finalDocuments});
			this.setState({persons: (customerDocuments && customerDocuments.finalPersons)});
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
				filename: res.path,
				applicationStep: CUSTOMER_REGISTRATION_STEPS["8_SIGN_LOAN_DOCUMENTS"]
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
				filename: res.path,
				applicationStep: CUSTOMER_REGISTRATION_STEPS["8_SIGN_LOAN_DOCUMENTS"],
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

	changeState = (value, key) => {
		this.setState({[key]: value});
	};

	submit = async () => {
		this.setState({submitted: true});

		const {documents, persons} = this.state;

		if ((documents && documents.length) !== (companyDocuments && companyDocuments.length)) {
			return false; // user have not selected all customer documents
		}

		if (!this.allPersonsDocumentsSelected()) {
			return false; // user have not selected all persons documents
		}

		const data = {
			documents,
			persons
		};
		const {
			match,
			fromOverview,
		} = this.props;

		const customerId = match.params.id;

		try {
			this.changeState(true, 'isSubmitting');
			await submitDocuments(customerId, data);
			this.changeState(true, 'success');
			this.changeState(false, 'isSubmitting');

			if (!fromOverview) {
				history.push({
					pathname: '/partner-dashboard'
				});
			}
		} catch (e) {
			console.log(e.response.data);
			this.changeState(false, 'isSubmitting');
		}
	};

	allPersonsDocumentsSelected = () => {
		const {persons} = this.state;

		const exist = persons && persons.findIndex((item) => {
			return item.documents.length !== (personDocuments && personDocuments.length);
		});

		return exist === -1;
	};

	render() {
		const {
			customerDocuments,
			disabled,
			fromOverview,
			customerMain,
		} = this.props;
		const {
			documents,
			persons,
			submitted
		} = this.state;

		return (
			<div className='col-md-12'>
				<div className='row form-group'>
					<div className='col-md-6'>
						<div className='row'>
							<div className='col-sm-5'>
								<label>Customer</label>
							</div>
							<div className='col-sm-7'>
								<label>
									{
										customerDocuments &&
										customerDocuments.tradingName
									}
								</label>
							</div>
						</div>
					</div>

					<div className='col-md-6'>
						<div className='row'>
							<div className='col-sm-5'>
								<label>Contact Name</label>
							</div>
							<div className='col-sm-7'>
								<label>{
									customerMain && customerMain.users && customerMain.users[0].name
								}</label>
							</div>
						</div>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-xl-12">
						<div className="row">
							<div className="col-md-12">
								<label className="mr-sm-2 mt-2">Company
									- {
										customerDocuments &&
										customerDocuments.tradingName
									}</label>
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
															className="file-upload-field"
															disabled={disabled}
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
										SAVE
									</button>
								</div>
							</div>
						) : (
							<div className="form-row mt-3">
								<div className="form-group col-12 text-center">
									<button
										className="btn btn-success pl-5 pr-5 mb-2"
										type="button"
										onClick={() => this.submit()}
									>
										SUBMIT DOCUMENTS
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
	customerMain: getCustomerMain(state),
	customerDocuments: getCustomerDocuments(state),
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
			loadCustomerDocuments: loadCustomerDocuments,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FinalSignForm);
