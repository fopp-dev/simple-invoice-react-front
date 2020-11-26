import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import {bindActionCreators} from "redux";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import CreditLogModalDialog from "./Modals/CreditLogModal";
import {loadCustomerMain} from "../../redux/actions/common";
import {getCustomerMain} from "../../redux/selectors/common";
import {Form, withFormik} from "formik";
import * as Yup from 'yup';
import {changeCredit} from "../../http/http-calls";
import CustomerOverviewHeader from "../Layout/CustomerOverviewHeader";

const formSchema = Yup.object().shape({
	credit: Yup.string()
		.test(
			'is-decimal',
			'You must enter a valid number',
			value => (value + "").match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),
		)
		.typeError('You must enter a valid number')
		.required('Required'),
	comment: Yup.string()
		.required('Required'),
});

class ChangeCredit extends Component {
	state = {
		creditModalVisible: false,
	};

	componentDidMount() {
		const id = this.props.match.params.id;
		const {
			loadCustomerMain,
		} = this.props;

		id && loadCustomerMain(id);
	}

	render() {
		const {creditModalVisible} = this.state;
		const {
			customerMain,
			values,
			errors,
			touched,
			setFieldValue,
			isSubmitting,
			status,
		} = this.props;
		const customerId = this.props.match.params.id;
		const success = status && status.success;

		return (
			<div>
				<ModalDialog
					show={success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						'Credit of ABC Reseller Inc changed'
					)}
					okText={'Ok'}
					onClickOk={() => {
						this.setState({success: false});
						history.push({pathname: `/customer-overview/${customerId}`});
					}}
				/>
				<CreditLogModalDialog
					onClickOk={() => {
						this.setState({creditModalVisible: false});
					}}
					show={creditModalVisible}
					customerId={customerId}
				/>
				<Backdrop show={isSubmitting}/>
				<CustomerOverviewHeader
					id={customerId}
				/>
				<PageTitle title={`${customerMain && customerMain.tradingName} - Change Credit`}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<Form className='personal_validate'>
											<div className='row'>
												<div className='col-md-12'>
													<p>
														Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
														anim
														id est eopksio laborum.
														Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque
														eopsloi laudantium, totam rem aperiam,
														eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunot
														explicabo.
													</p>
												</div>

												<div className='col-md-12 mt-2 mb-3 text-center'>
													<button
														className='btn btn-primary w-25'
														type='button'
														onClick={() => this.setState({creditModalVisible: true})}
													>
														SHOW CREDIT LOG
													</button>
												</div>

												<div className='col-md-6 form-group'>
													<div className='row mb-2'>
														<div className='col-md-4'>
															<label className='mr-sm-2 mt-2'>
																Customer
															</label>
														</div>

														<div className='col-md-6'>
															<label className='mr-sm-2 mt-2'>
																{customerMain && customerMain.tradingName}
															</label>
														</div>
													</div>

													<div className='row mb-2'>
														<div className='col-md-4'>
															<label className='mr-sm-2 mt-2'>
																Contact Name
															</label>
														</div>

														<div className='col-md-6'>
															<label className='mr-sm-2 mt-2'>
																{customerMain && customerMain.users && customerMain.users[0].name}
															</label>
														</div>
													</div>

													<div className='row mb-2'>
														<div className='col-md-4'>
															<label className='mr-sm-2 mt-2'>
																Current Credit
															</label>
														</div>

														<div className='col-md-6'>
															<label className='mr-sm-2 mt-2'>
																{customerMain && customerMain.approvedCreditLimit} TZS
															</label>
														</div>
													</div>
												</div>

												<div className='col-md-6 form-group'>
													<div className='row mb-2'>
														<div className='col-md-4'>
															<label className='mr-sm-2 mt-2'>
																New Credit*
															</label>
														</div>

														<div className='col-md-6'>
															<input
																type="number"
																name="credit"
																className={`form-control text-right ${errors.credit && touched.credit && 'is-invalid'}`}
																value={values['credit']}
																onChange={e => setFieldValue('credit', e.target.value)}
																placeholder="TZS"
															/>
															{errors.credit && touched.credit ?
																<div className="invalid-feedback">{errors.credit}</div> : null}
														</div>
													</div>

													<div className='row mb-2'>
														<div className='col-md-4'>
															<label className='mr-sm-2 mt-2'>
																Comment*
															</label>
														</div>

														<div className='col-md-6'>
														<textarea
															rows='5'
															name="comment"
															className={`form-control pt-3 pb-3 ${errors.comment && touched.comment && 'is-invalid'}`}
															value={values['comment']}
															onChange={e => setFieldValue('comment', e.target.value)}
															placeholder="Why was credit line changed?"
														/>
															{errors.comment && touched.comment ?
																<div className="invalid-feedback">{errors.comment}</div> : null}
														</div>
													</div>
												</div>

												<div className='col-md-12 mt-2 mb-3 text-center'>
													<button
														className='btn btn-success w-25'
														type="submit"
													>
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

const EnhancedChangeCredit = withFormik({
	mapPropsToValues: (props) => {
		return {
			credit: '',
			comment: '',
		}
	},
	validationSchema: formSchema,
	handleSubmit: async (
		values, {props, setSubmitting, setStatus}) => {
		values['credit'] = parseFloat(values['credit']);
		const customerId = props.match.params.id;

		if (customerId) {
			try {
				await changeCredit(customerId, values);
				setSubmitting(false);
				setStatus({success: true});
			} catch (e) {
				console.log(e.response.data);
				setSubmitting(false);
			}
		} else {
			setSubmitting(false);
		}
	},
	enableReinitialize: true
})(ChangeCredit);

const mapStateToProps = (state) => ({
	customerMain: getCustomerMain(state)
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadCustomerMain: loadCustomerMain,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnhancedChangeCredit);
