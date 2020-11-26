import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './../Pages/PageTitle';
import Backdrop from "../Components/Backdrop";
import {bindActionCreators} from "redux";
import history from "../../history";
import ModalDialog from "../Components/Modal";
import {closeCredit} from "../../http/http-calls";
import CustomerOverviewHeader from "../Layout/CustomerOverviewHeader";

class CloseCredit extends Component {
	state = {
		isSubmitting: false,
		success: false,
	};

	submit = async () => {
		this.setState({isSubmitting: true});
		const id = this.props.match.params.id;

		try {
			await closeCredit(id);
			this.setState({
				isSubmitting: false,
				success: true,
			});
		} catch (e) {
			console.log(e.response.data);
			this.setState({
				isSubmitting: false,
			});
		}
	};

	render() {
		const {isSubmitting, success} = this.state;
		const id = this.props.match.params.id; // customer id

		return (
			<div>
				<ModalDialog
					show={success}
					title={(
						<i className='fa fa-check-circle-o fa-2x text-success'/>
					)}
					content={(
						'Credit of ABC Reseller Inc temporary closed'
					)}
					okText={'Ok'}
					onClickOk={() => {
						this.setState({success: false});
						history.push({pathname: `/customer-overview/${id}`});
					}}
				/>
				<Backdrop show={isSubmitting}/>
				<CustomerOverviewHeader
					id={id}
				/>
				<PageTitle title={'ABC Reseller Inc - Temporary Close Credit'}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div className='row'>
											<div className='col-md-12'>
												<p>
													Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
													id est eopksio laborum.
													Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque
													eopsloi laudantium, totam rem aperiam,
													eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunot
													explicabo. Nemo ernim ipsam voluptatem quia voluptas sit
													aspernatur aut odit aut fugit, sedopk quia consequuntur magni dolores eos qui rationesopl
													voluptatem sequi nesciunt. Neque porro quisquameo est, qui
													dolorem ipsum quia dolor sit amet, eopsmiep consectetur, adipisci velit, seisud quia non
													numquam eius modi tempora incidunt ut labore et dolore wopeir magnam
													aliquam quaerat voluptatem eoplmuriquisqu
												</p>
											</div>

											<div className='col-md-12 mt-5 text-center'>
												<button
													className='btn btn-success'
													onClick={this.submit}
												>
													CONFIRM CLOSE OF CREDIT
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CloseCredit);
