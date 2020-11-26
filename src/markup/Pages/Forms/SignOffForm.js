import React, {Component} from 'react';
import DownloadFile from "../../Components/Download";
import {CUSTOMER_REGISTRATION_STEPS, partnerSignedDocuments} from "../../../constants";
import {uploadFile} from "../../../http/http-calls";
import {getCustomerDocuments, getCustomerMain} from "../../../redux/selectors/common";
import {bindActionCreators} from "redux";
import {loadCustomerDocuments, loadCustomerMain} from "../../../redux/actions/common";
import {approveApplicationAction} from "../../../redux/actions/partner";
import {connect} from "react-redux";
import history from "../../../history";

class SignOffForm extends Component {
	state = {
		submitted: false,
		checked: false || this.props.fromOverview,
		documents: this.props.customerDocuments && this.props.customerDocuments.documents,
		persons: this.props.customerDocuments && this.props.customerDocuments.persons,
		signedDocuments: this.props.customerDocuments && this.props.customerDocuments.signedDocuments,
		partnerComments: (this.props.customerDocuments && this.props.customerDocuments.partnerComments) || '',
	};

	componentDidMount() {
		const {
			customerId,
			loadCustomerDocuments,
			loadCustomerMain,
		} = this.props;

		if (customerId) {
			loadCustomerDocuments(customerId);
			loadCustomerMain(customerId);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {customerDocuments} = this.props;

		if ((customerDocuments !== prevProps.customerDocuments)) {
			this.setState({documents: customerDocuments && customerDocuments.documents});
			this.setState({persons: (customerDocuments && customerDocuments.persons)});
			this.setState({signedDocuments: (customerDocuments && customerDocuments.signedDocuments)});
			this.setState({partnerComments: (customerDocuments && customerDocuments.partnerComments) || ''});
		}
	}

	navigateTo = (path) => {
		history.push({
			pathname: path,
			from: '/approve-application'
		});
	};

	changeFile = async (e, fileName, stateName) => {
		const originName = (e.target['files'][0].name);

		const payload = new FormData();
		payload.append('file', e.target['files'][0], originName);

		try {
			const res = await uploadFile(payload);
			const data = JSON.parse(JSON.stringify(this.state[stateName]));
			const exist = data && data.find((item) => {
				return item.name === fileName;
			});
			const existIndex = data && data.findIndex((item) => {
				return item.name === fileName;
			});

			const customerId = this.props.customerId;
			let newItem = {
				name: fileName,
				filenameOriginal: originName,
				filename: res.path,
				customer: customerId,
				applicationStep: CUSTOMER_REGISTRATION_STEPS["3_PARTNER_APPROVE_APPLICATION"],
			};

			if (exist) {
				newItem['id'] = exist.id;
				data.splice(existIndex, 1, newItem);
			} else {
				data.push(newItem);
			}

			this.setState({[stateName]: data});
		} catch (e) {
			console.error(e);
		}
	};

	changeState = (value, stateName) => {
		this.setState({[stateName]: value});
	};

	getMappedDocument = (name, documents) => {
		const entity = documents && documents.find((item) => {
			return item.name === name;
		});

		return entity && entity.filenameOriginal;
	};

	submit = () => {
		const {checked, signedDocuments, partnerComments} = this.state;
		this.setState({submitted: true});
		const {approveApplication, fromOverview} = this.props;
		const customerId = this.props.customerId;

		if (
			this.allChecked() &&
			signedDocuments.length === partnerSignedDocuments.length &&
			checked
		) {
			let pathInfo = {};
			if (fromOverview) {
				approveApplication(
					customerId,
					{
						documents: signedDocuments,
						partnerComments,
					},
					pathInfo
				);
			} else {
				pathInfo = {
					pathname: `/final-document-sign/${customerId}`,
					from: `/approve-application/${customerId}`
				};
				approveApplication(
					customerId,
					{
						documents: signedDocuments,
						partnerComments,
					},
					pathInfo
				);
			}
		}
	};

	changePersonSignChecked = (checked, stateName, index, docIndex) => {
		const temp = JSON.parse(JSON.stringify(this.state[stateName]));
		temp[index]['documents'][docIndex].checked = !this.state[stateName][index]['documents'][docIndex].checked;

		this.setState({[stateName]: temp});
	};

	changeSignChecked = (checked, stateName, index) => {
		const temp = JSON.parse(JSON.stringify(this.state[stateName]));
		temp[index].checked = !this.state[stateName][index].checked;

		this.setState({[stateName]: temp});
	};

	allChecked = () => {
		const {documents, persons} = this.state;

		const uncheckedDocIndex = documents && documents.findIndex(item => !item.checked);
		const uncheckedPersonIndex = persons && persons.findIndex(item => {
			const uncheckedPersonDocIndex = item && item.documents.findIndex(ele => !ele.checked);
			return uncheckedPersonDocIndex !== -1;
		});

		return (uncheckedDocIndex === -1) && (uncheckedPersonIndex === -1);
	};

	render() {
		const {
			disabled,
			fromOverview,
			customerDocuments,
			customerMain,
		} = this.props;
		const {
			signedDocuments,
			partnerComments,
			submitted,
			checked,
			documents,
			persons,
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
								<label>{customerMain && customerMain.users && customerMain.users[0].name}</label>
							</div>
						</div>
					</div>
				</div>

				<div className='row form-group'>
					<div className='col-md-12 mb-3'>
						<label>Document Check*</label>
					</div>
					{
						documents &&
						documents.map((item, key) => (
							<div className='col-md-12' key={`customer-document-${key}`}>
								<label className="toggle">
									<input
										className="toggle-checkbox"
										type="checkbox"
										checked={item.checked}
										disabled={disabled}
										onChange={(e) => this.changeSignChecked(e.target.checked, 'documents', key)}
									/>
									<div className="toggle-switch"/>
									<span className="toggle-label"/>
								</label>
								<DownloadFile
									name={item.name}
									link={item.filename}
									filename={item.filenameOriginal}
								/>
							</div>
						))
					}

					{
						persons &&
						persons.map((person, key) => (
							person.documents &&
							person.documents.map((item, docKey) => (
								<div className='col-md-12' key={`customer-person-${key}-document-${docKey}`}>
									<label className="toggle">
										<input
											className="toggle-checkbox"
											type="checkbox"
											checked={item.checked}
											disabled={disabled}
											onChange={(e) => this.changePersonSignChecked(e.target.checked, 'persons', key, docKey)}
										/>
										<div className="toggle-switch"/>
										<span className="toggle-label"/>
									</label>
									<DownloadFile
										name={`${person.firstName} ${person.lastName} - ${item.name}`}
										link={item.filename}
										filename={item.filenameOriginal}
									/>
								</div>
							))
						))
					}
					<div className='col-md-12'>
						{
							!this.allChecked() && submitted && (
								<div className="invalid-feedback"
										 style={{display: 'block'}}>Check all</div>
							)
						}
					</div>
				</div>

				<div className='row form-group'>
					<div className='col-md-12 mb-3'>
						<label>Upload Signed Documents</label>
					</div>

					<div className='col-md-12'>
						{
							partnerSignedDocuments &&
							partnerSignedDocuments.map((item, key) => (
								<div className='row mb-2' key={key}>
									<div className='col-md-3'>
										<label className='mr-sm-2 mt-2'>{item}</label>
									</div>
									<div className='col-md-6'>
										<div
											className="file-upload-wrapper"
											data-text={this.getMappedDocument(item, signedDocuments)}
										>
											<input
												name="file-upload-field"
												type="file"
												disabled={disabled}
												className="file-upload-field"
												accept=".pdf,.doc,.jpg,.png"
												onChange={(e) => this.changeFile(e, item, 'signedDocuments')}
											/>
										</div>
										{
											!this.getMappedDocument(item, signedDocuments) && submitted && (
												<div className="invalid-feedback"
														 style={{display: 'block'}}>Select File</div>
											)
										}
									</div>
								</div>
							))
						}
					</div>

					<div className='col-md-12 mt-3 mb-3'>
						<label>Comments</label>
					</div>

					<div className='col-md-12'>
						<div className='row'>
							<div className='col-md-9 form-group'>
								<textarea
									className='form-control pt-2'
									rows={6}
									disabled={disabled}
									value={partnerComments}
									onChange={(e) => this.changeState(e.target.value, 'partnerComments')}
								/>
							</div>
						</div>
					</div>
				</div>

				{
					!disabled && (
						fromOverview ? (
							<div className='row form-group'>
								<div className='col-md-12 text-center'>
									<button className='btn btn-success' onClick={this.submit}>
										Save
									</button>
								</div>
							</div>
						) : (
							<div className='row form-group'>
								<div className='col-md-12 text-center'>
									<label className="toggle">
										<input
											className="toggle-checkbox"
											type="checkbox"
											checked={checked}
											onChange={(e) => this.changeState(e.target.checked, 'checked')}
										/>
										<div className="toggle-switch"/>
										<span
											className="toggle-label">I, the Partner, approve Mtaji Fees according to Terms & Conditions</span>
										{
											!checked && submitted && (
												<div className="invalid-feedback"
														 style={{display: 'block'}}>Agree on this</div>
											)
										}
									</label>
								</div>

								<div className='col-md-12 text-center'>
									<button className='btn btn-success' onClick={this.submit}>
										APPROVE APPLICATION
									</button>
								</div>
							</div>
						)
					)
				}
			</div>
		)
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
			approveApplication: approveApplicationAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignOffForm);
