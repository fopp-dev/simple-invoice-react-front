import React, {Component} from 'react'
// import { Container, Row, Col } from 'reactstrap';
import {NavLink} from 'reactstrap';
import Header from '../../Layout/Header';
import PageTitle from '../PageTitle';
import HomeChart from './Chart'

class Homepage extends Component {

	render() {
		return (
			<div>
				<Header/>
				<PageTitle/>
				<div className="homepage mb-80">
					<div className="container">
						<div className="row">
							<div className="col-xl-8 col-lg-8">
								<div className="card profile_chart">
									<div className="card-header">
										<div className="chart_current_data">
											<h3>254856 <span>USD</span></h3>
											<p className="text-success">125648 <span>USD (20%)</span></p>
										</div>
										<div className="duration-option">
											<NavLink className="active" to="/">All time</NavLink>
											<NavLink to="/">24 H</NavLink>
											<NavLink to="/">24 H</NavLink>
											<NavLink to="/">7D</NavLink>
											<NavLink to="/">14D</NavLink>
											<NavLink to="/">30D</NavLink>
										</div>
									</div>
									<div className="card-body pt-0">
										<HomeChart/>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-4">
								<div className="card balance-widget">
									<div className="card-header pb-0 border-0">
										<h4 className="card-title">Your Portfolio </h4>
									</div>
									<div className="card-body pt-0">
										<div className="balance-widget">
											<div className="total-balance">
												<h3>$63411.00</h3>
												<h6>Total Balance</h6>
											</div>
											<ul className="list-unstyled">
												<li className="media">
													<i className="cc BTC mr-3"></i>
													<div className="media-body">
														<h5 className="m-0">Bitcoin</h5>
													</div>
													<div className="text-right">
														<h5>0.000242 BTC</h5>
														<span>0.125 USD</span>
													</div>
												</li>
												<li className="media">
													<i className="cc LTC mr-3"></i>
													<div className="media-body">
														<h5 className="m-0">Litecoin</h5>
													</div>
													<div className="text-right">
														<h5>0.000242 LTC</h5>
														<span>0.125 USD</span>
													</div>
												</li>
												<li className="media">
													<i className="cc XRP mr-3"></i>
													<div className="media-body">
														<h5 className="m-0">Ripple</h5>
													</div>
													<div className="text-right">
														<h5>0.000242 XRP</h5>
														<span>0.125 USD</span>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-xl-9 col-lg-9">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h4 className="card-title">Recent Activities</h4>
										<NavLink to="/">View More</NavLink>
									</div>
									<div className="card-body">
										<div className="transaction-table">
											<div className="table-responsive">
												<table className="table mb-0 table-responsive-sm">
													<tbody>
													<tr>
														<td><span className="sold-thumb"><i className="la la-arrow-down"></i></span>
														</td>

														<td>
															<span className="badge badge-danger">Sold</span>
														</td>
														<td>
															<i className="cc BTC"></i> Bitcoin
														</td>
														<td>
															Using - Bank *******5264
														</td>
														<td className="text-danger">-0.000242 BTC</td>
														<td>-0.125 USD</td>
													</tr>
													<tr>
														<td><span className="buy-thumb"><i className="la la-arrow-up"></i></span>
														</td>
														<td>
															<span className="badge badge-success">Buy</span>
														</td>
														<td>
															<i className="cc LTC"></i> Litecoin
														</td>
														<td>
															Using - Card *******8475
														</td>
														<td className="text-success">-0.000242 BTC</td>
														<td>-0.125 USD</td>
													</tr>
													<tr>
														<td><span className="sold-thumb"><i className="la la-arrow-down"></i></span>
														</td>
														<td>
															<span className="badge badge-danger">Sold</span>
														</td>
														<td>
															<i className="cc XRP"></i> Ripple
														</td>
														<td>
															Using - Card *******8475
														</td>
														<td className="text-danger">-0.000242 BTC</td>
														<td>-0.125 USD</td>
													</tr>
													<tr>
														<td><span className="buy-thumb"><i className="la la-arrow-up"></i></span>
														</td>
														<td>
															<span className="badge badge-success">Buy</span>
														</td>
														<td>
															<i className="cc DASH"></i> Dash
														</td>
														<td>
															Using - Card *******2321
														</td>
														<td className="text-success">-0.000242 BTC</td>
														<td>-0.125 USD</td>
													</tr>
													<tr>
														<td><span className="sold-thumb"><i className="la la-arrow-down"></i></span>
														</td>
														<td>
															<span className="badge badge-danger">Sold</span>
														</td>
														<td>
															<i className="cc BTC"></i> Bitcoin
														</td>
														<td>
															Using - Card *******2321
														</td>
														<td className="text-danger">-0.000242 BTC</td>
														<td>-0.125 USD</td>
													</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-3">
								<div className="card apps-download">
									<div className="card-body">
										<h4 className="card-title">Mobile app</h4>
										<div className="apps-download-content">
											<h3>Get the best mobile app to exchange or buy crypto on the go:</h3>
											<div className="mt-4 text-center">
												<NavLink to="/" className="btn btn-primary my-1 mx-1"><img
													src={require('../../../images/android.svg')} alt=""/></NavLink>
												<NavLink to="/" className="btn btn-success my-1 mx-1"><img
													src={require('../../../images/apple.svg')} alt=""/></NavLink>
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

export default Homepage;
