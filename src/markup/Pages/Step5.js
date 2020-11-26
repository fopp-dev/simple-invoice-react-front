import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import * as Yup from 'yup';
import {Form, withFormik} from "formik";
import {bindActionCreators} from "redux";
import CustomerNotActivatedHeader from "../Layout/CustomerNotActivatedHeader";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import {submitApplication} from "../../http/http-calls";
import {decodeToken} from "../../common";

const formSchema = Yup.object().shape({
	accepted: Yup.bool()
		.oneOf([true], 'Please accept'),
});

class Step5 extends Component {
	navigateTo = (path) => {
		this.props.history.push({
			pathname: path,
			from: '/customer-step5'
		});
	};

	render() {
		const {values, errors, touched, setStatus, setFieldValue, isSubmitting, status} = this.props;

		return (
			<div>
				<ModalDialog
					show={status && status.success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						'Email sent to partner successfully'
					)}
					okText={'Ok'}
					onClickOk={() => {
						setStatus({success: false});
						history.push('/customer-not-activated');
					}}
				/>
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
											Step 5 of 5 - Submit Application
										</h4>
									</div>
									<div className="card-body">
										<Form className="personal_validate">
											<div className="form-row">
												<div className="form-group col-xl-12">
													<div className="row">
														<div className="col-md-12 text-center">
															<label className="toggle">
																<input
																	className="toggle-checkbox"
																	type="checkbox"
																	checked={values['accepted']}
																	onChange={(e) => setFieldValue('accepted', e.target.checked)}
																/>
																<div className="toggle-switch"/>
																<span className="toggle-label">I Accept the Terms and Conditions</span>
															</label>
															{errors.accepted && touched.accepted ?
																<div className='text-danger small'>{errors.accepted}</div> : null}
														</div>
													</div>
												</div>
											</div>

											<div className="form-row>">
												<div className="form-group col-12 text-center">
													<button className="btn btn-primary pl-5 pr-5 mr-2 mb-2" type="button"
																	onClick={() => this.navigateTo('customer-step4')}>GO BACK
													</button>
													<button className="btn btn-primary pl-5 pr-5 mb-2" type="submit">SUBMIT</button>
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

const EnhancedStep5 = withFormik({
	mapPropsToValues: (props) => {
		return {
			accepted: false
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting, setStatus}) => {
		try {
			const userDetails = decodeToken();
			if (userDetails && userDetails.customer && userDetails.customer.id) {
				const customerId = userDetails.customer.id;
				await submitApplication(customerId);
			}
			setStatus({success: true});
			setSubmitting(false);
		} catch (e) {
			console.log(e.response.data);
			setSubmitting(false);
		}
	},
	enableReinitialize: true
})(Step5);

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{

		},
		dispatch
	);

export default connect(
	null,
	mapDispatchToProps
)(EnhancedStep5);
