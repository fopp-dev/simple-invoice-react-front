import React, {Component} from 'react';
import {connect} from "react-redux";
import PageTitle from './PageTitle';
import {bindActionCreators} from "redux";
import MtajiHeader from "../Layout/MtajiHeader";
import {loadAllCustomersAction} from "../../redux/actions/matji";
import {getAllCustomers} from "../../redux/selectors/mtaji";
import ActivateCreditForm from "./Forms/ActivateCreditForm";

class ActivateCredit extends Component {
	render() {
		return (
			<div>
				<MtajiHeader/>
				<PageTitle title={'New Customer - Final Credit Line Decision (Activate Credit)'}/>
				<div className="settings mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header">
										<h4 className="card-title"/>
									</div>
									<div className="card-body">
										<ActivateCreditForm
											match={this.props.match}
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

const mapStateToProps = (state) => ({
	customers: getAllCustomers(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadAllCustomers: loadAllCustomersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivateCredit);
