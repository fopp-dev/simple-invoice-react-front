import React, {Component} from 'react';
import PartnerHeader from "../Layout/PartnerHeader";
import PageTitle from "./PageTitle";
import {Form, withFormik} from "formik";
import * as Yup from 'yup';
import {addBankStatement, uploadFile} from "../../http/http-calls";
import Backdrop from "../Components/Backdrop";
import history from "../../history";

const formSchema = Yup.object().shape({
	name: Yup.string()
		.required('Required'),
	filename: Yup.string()
		.required('Required'),
	filenameOriginal: Yup.string()
		.required('Required'),
});

class UploadBankStatement extends Component {

	changeFile = async (e) => {
		const originName = (e.target['files'][0].name);

		const payload = new FormData();
		payload.append('file', e.target['files'][0], originName);

		try {
			const res = await uploadFile(payload);
			const {
				setFieldValue
			} = this.props;
			setFieldValue('filename', res.path);
			setFieldValue('filenameOriginal', originName);
		} catch (e) {
			console.error(e);
		}
	};

	render() {
		const {
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
		} = this.props;

		return (
			<div>
				<Backdrop show={isSubmitting}/>
				<PartnerHeader/>
				<PageTitle title='Upload Bank Statement (Weekly Clearance)'/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-body">
										<Form className='personal_validate'>
											<div className='row form-group'>
												<div className='col-md-2 offset-3'>
													<label className='mr-sm-2 mt-2'>Date*</label>
												</div>

												<div className='col-md-4'>
													<input
														type='date'
														className={`form-control ${errors.name && touched.name && 'is-invalid'}`}
														name='name'
														value={values['name']}
														onChange={(e) => setFieldValue('name', e.target.value)}
													/>
													{errors.name && touched.name ?
														<div className="invalid-feedback">{errors.name}</div> : null}
												</div>
											</div>

											<div className='row form-group'>
												<div className='col-md-2 offset-3'>
													<label className='mr-sm-2 mt-2'>Bank Statement*</label>
												</div>

												<div className='col-md-4'>
													<div
														className="file-upload-wrapper"
														data-text={values['filenameOriginal']}
													>
														<input
															name="filename"
															type="file"
															className={`form-control ${errors.filename && touched.filename && 'is-invalid'}`}
															accept=".pdf,.doc,.jpg,.png"
															onChange={(e) => this.changeFile(e)}
														/>
													</div>
													{errors.filename && touched.filename ?
														<div className="invalid-feedback" style={{display: 'block'}}>{errors.filename}</div> : null}
												</div>
											</div>

											<div className='row form-group'>
												<div className='col-md-12 text-center'>
													<button className='btn btn-primary' type='submit'>
														SAVE
													</button>
												</div>
											</div>
										</Form>
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

const EnhancedUploadBankStatement = withFormik({
	mapPropsToValues: (props) => {
		return {
			name: '',
			filename: '',
			filenameOriginal: '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting}) => {
		try {
			await addBankStatement(values);
			setSubmitting(false);
			history.push({
				pathname: '/partner-dashboard',
				from: '/upload-bank-statement',
			});
		} catch (e) {
			setSubmitting(false);
			console.log(e.response.data);
		}
	},
	enableReinitialize: true
})(UploadBankStatement);

export default EnhancedUploadBankStatement;
