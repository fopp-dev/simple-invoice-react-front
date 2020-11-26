import React, {Component} from 'react'
import PageTitle from './../Pages/PageTitle';
import MtajiHeader from "../Layout/MtajiHeader";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadAllUsersAction} from "../../redux/actions/user";
import {getAllUsers} from "../../redux/selectors/user";
import history from "../../history";
import {toProperCase} from "../../common";

class UserAdministration extends Component {
	componentDidMount() {
		const {loadAllUsers} = this.props;

		loadAllUsers();
	}

	navigateTo = (path) => {
		history.push(path);
	};

	render() {
		const {allUsers} = this.props;
		return (
			<div>
				<MtajiHeader/>
				<PageTitle title='User Administration'/>
				<div className="homepage mb-80">
					<div className="container">
						<div className='row'>
							<div className='col-md-12 form-group'>
								<button className='btn btn-outline-primary' onClick={() => this.navigateTo('/create-user')}>
									Create
								</button>
							</div>
							<div className='col-md-12'>
								<div className='card'>
									<div className='card-body'>
										<div className='transaction-table'>
											<div className='table-responsive'>
												<table className="table mb-0 table-responsive-sm">
													<thead>
													<tr>
														<td className='pt-2 pb-2'>
															<label>Email</label>
														</td>
														<td className='pt-2 pb-2'>
															<label>Role</label>
														</td>
														<td className='pt-2 pb-2'>
															<label>Enabled</label>
														</td>
														<td className='pt-2 pb-2'>
															<label>Edit</label>
														</td>
													</tr>
													</thead>
													<tbody>
													{
														allUsers &&
														allUsers.map((user, index) => (
															<tr key={index}>
																<td className='pt-2 pb-2'>
																	{user.email}
																</td>
																<td className='pt-2 pb-2'>
																	{toProperCase(user.role)}
																</td>
																<td className='pt-2 pb-2'>
																	<label className="toggle" style={{cursor: 'default'}}>
																		<input
																			className="toggle-checkbox"
																			type="checkbox"
																			checked={user.enabled}
																			disabled={true}
																		/>
																		<div className="toggle-switch"/>
																		<span className="toggle-label"/>
																	</label>
																	{user.enabled}
																</td>
																<td className='pt-2 pb-2'>
																	<i
																		className='fa fa-edit fa-2x'
																		style={{cursor: 'pointer'}}
																		onClick={() => this.navigateTo(`/edit-user/${user.id}`)}
																	/>
																</td>
															</tr>
														))
													}
													</tbody>
												</table>
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

const mapStateToProps = (state) => ({
	allUsers: getAllUsers(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loadAllUsers: loadAllUsersAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserAdministration);
