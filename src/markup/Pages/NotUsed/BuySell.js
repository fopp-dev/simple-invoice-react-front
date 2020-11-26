import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import classnames from 'classnames';
import Header from '../../Layout/Header';
import PageTitle from '../PageTitle';

const BuySell = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Header />
            <PageTitle />
            <div className="buy_sell mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buy-sell-widget">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '1' })}
                                                    onClick={() => { toggle('1'); }}>
                                                    Buy
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '2' })}
                                                    onClick={() => { toggle('2'); }}>
                                                    Sell
                                            </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Currency</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text"><i
                                                                    className="cc BTC-alt"></i></label>
                                                            </div>
                                                            <select name='currency' className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="bitcoin">Bitcoin</option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Payment Method</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text"><i
                                                                    className="fa fa-bank"></i></label>
                                                            </div>
                                                            <select className="form-control" name="method">
                                                                <option value="">Select</option>
                                                                <option value="bank">Bank of America ********45845</option>
                                                                <option value="master">Master Card ***********5458</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Enter your amount</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control"
                                                                placeholder="0.0214 BTC" />
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                placeholder="125.00 USD" />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">Monthly Limit</p>
                                                            <h6 className="mb-0">$49750 remaining</h6>
                                                        </div>
                                                    </div>
                                                    <NavLink to="/buysell" tag={RRNavLink}
                                                        className="btn btn-success btn-block">Exchange
                                                    Now</NavLink>
                                                </form>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Currency</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text"><i
                                                                    className="cc BTC-alt"></i></label>
                                                            </div>
                                                            <select name='currency' className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="bitcoin">Bitcoin</option>
                                                                <option value="litecoin">Litecoin</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Payment Method</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text"><i
                                                                    className="fa fa-bank"></i></label>
                                                            </div>
                                                            <select className="form-control" name="method">
                                                                <option value="">Select</option>
                                                                <option value="bank">Bank of America ********45845</option>
                                                                <option value="master">Master Card ***********5458</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="mr-sm-2 mt-2">Enter your amount</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control"
                                                                placeholder="0.0214 BTC" />
                                                            <input type="text" name="usd_amount" className="form-control"
                                                                placeholder="125.00 USD" />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">Monthly Limit</p>
                                                            <h6 className="mb-0">$49750 remaining</h6>
                                                        </div>
                                                    </div>
                                                    <NavLink to="/buysell" tag={RRNavLink}
                                                        className="btn btn-success btn-block">Exchange
                                                    Now</NavLink>
                                                </form>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buyer-seller">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="buyer-info">
                                                <div className="media">
                                                    <img className="mr-3" src={require('../../../images/profile/2.png')} alt="" width="50" />
                                                    <div className="media-body">
                                                        <h4>Buyer</h4>
                                                        <h5>Michael John</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="seller-info text-right">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h4>Seller</h4>
                                                        <h5>John Doe</h5>
                                                    </div>
                                                    <img className="ml-3" src={require('../../../images/profile/1.png')} alt="" width="50" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><span className="text-primary">You are selling</span></td>
                                                        <td><span className="text-primary">0.00254 BTC</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Payment Method</td>
                                                        <td>Bank of America Bank ***********5245</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Exchange Rate</td>
                                                        <td>0.00212455 BTC</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Fee</td>
                                                        <td>$28.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td>$854.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vat</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Sub Total</td>
                                                        <td> $1232.00 USD</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-xxl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">FAQ</h4>
                                </div>
                                <div className="card-body">
                                    <div id="accordion-faq" className="accordion">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="mb-0 collapsed c-pointer" data-toggle="collapse"
                                                    data-target="#collapseOne1" aria-expanded="false"
                                                    aria-controls="collapseOne1"><i className="fa" aria-hidden="true"></i>What
                                                Shipping Methods are Available?</h5>
                                            </div>
                                            <div id="collapseOne1" className="collapse show" data-parent="#accordion-faq">
                                                <div className="card-body">Anim pariatur cliche reprehenderit, enim eiusmod high
                                                    life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                                                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                                    eiusmod.
                                                    <br />
                                                    <br />
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high
                                                    life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                                                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                                    eiusmod.
                                                    <br />
                                                    <br />
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high
                                                    life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                                                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                                    eiusmod.
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="intro-video-play">
                                <div className="play-btn">
                                    <a className="popup-youtube" href="https://www.youtube.com/watch?v=IjzUwnqWc5Q">
                                        <span><i className="fa fa-play"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BuySell;
