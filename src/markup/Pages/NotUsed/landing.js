import React, { Component } from 'react';
import {
    NavLink,
} from 'reactstrap';
import HeaderLanding from '../../Layout/HeaderLanding'
import Testimonial from '../../element/testimonial';

class Landing extends Component {
    render() {
        return (
            <div className="zindex">
                <HeaderLanding />

                <div class="intro section-padding position-relative" id="intro">
                    <div class="container">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-xl-6 col-md-6">
                                <div class="intro-content">
                                    <h2>Buy and sell <br />cryptocurrency</h2>
                                    <p>Fast and secure way to purchase or exchange 150+ cryptocurrencies</p>
                                    <a href="#" class="btn">GET STARTED</a>
                                </div>
                            </div>
                            <div class="col-xl-4 col-md-6 py-md-5">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="buy-sell-widget">
                                            <form method="post" name="myform" class="currency_validate">
                                                <div class="form-group">
                                                    <label class="mr-sm-2">Currency</label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text"><i class="cc BTC-alt"></i></label>
                                                        </div>
                                                        <select name='currency' class="form-control">
                                                            <option value="">Select</option>
                                                            <option value="bitcoin">Bitcoin</option>
                                                            <option value="litecoin">Litecoin</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="mr-sm-2">Payment Method</label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text"><i class="fa fa-bank"></i></label>
                                                        </div>
                                                        <select class="form-control" name="method">
                                                            <option value="">Select</option>
                                                            <option value="bank">Bank of America ********45845</option>
                                                            <option value="master">Master Card ***********5458</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="mr-sm-2">Enter your amount</label>
                                                    <div class="input-group">
                                                        <input type="text" name="currency_amount" class="form-control"
                                                            placeholder="0.0214 BTC" />
                                                        <input type="text" name="usd_amount" class="form-control"
                                                            placeholder="125.00 USD" />
                                                    </div>
                                                    <div class="d-flex justify-content-between mt-3">
                                                        <p class="mb-0">Monthly Limit</p>
                                                        <h6 class="mb-0">$49750 remaining</h6>
                                                    </div>
                                                </div>
                                                <button type="submit" name="submit" class="btn btn-success btn-block">Exchange
                                            Now</button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="market section-padding page-section" id="market">
                    <div class="container">
                        <div class="row py-lg-5 justify-content-center">
                            <div class="col-xl-6">
                                <div class="section_heading">
                                    <span>Explore</span>
                                    <h3>The World's Leading Cryptocurrency Exchange</h3>
                                    <p>Trade Bitcoin, ETH, and hundreds of other cryptocurrencies in minutes.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="market-table">
                                            <div class="table-responsive">
                                                <table class="table mb-0 table-responsive-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Change</th>
                                                            <th>Chart</th>
                                                            <th>Trade</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1 </td>
                                                            <td class="coin_icon">
                                                                <i class="cc BTC"></i>
                                                                <span>Bitcoin <b>BTC</b></span>
                                                            </td>

                                                            <td>
                                                                USD 680,175.06
                                                    </td>
                                                            <td>
                                                                <span class="text-success">+1.13%</span>
                                                            </td>
                                                            <td> <span class="sparkline8"></span></td>
                                                            <td><a href="#" class="btn btn-success">Buy</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>2 </td>
                                                            <td class="coin_icon">
                                                                <i class="cc ETH"></i>
                                                                <span>Ethereum <b>ETH</b></span>
                                                            </td>

                                                            <td>
                                                                USD 680,175.06
                                                    </td>
                                                            <td>
                                                                <span class="text-success">+1.13%</span>
                                                            </td>
                                                            <td> <span class="sparkline8"></span></td>
                                                            <td><a href="#" class="btn btn-success">Buy</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td class="coin_icon">
                                                                <i class="cc BCH-alt"></i>
                                                                <span>Bitcoin Cash <b>BCH</b></span>
                                                            </td>

                                                            <td>
                                                                USD 680,175.06
                                                    </td>
                                                            <td>
                                                                <span class="text-success">+1.13%</span>
                                                            </td>
                                                            <td> <span class="sparkline8"></span></td>
                                                            <td><a href="#" class="btn btn-success">Buy</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td class="coin_icon">
                                                                <i class="cc LTC"></i>
                                                                <span>Litecoin <b>LTC</b></span>
                                                            </td>

                                                            <td>
                                                                USD 680,175.06
                                                    </td>
                                                            <td>
                                                                <span class="text-danger">-0.47%</span>
                                                            </td>
                                                            <td> <span class="sparkline8"></span></td>
                                                            <td><a href="#" class="btn btn-success">Buy</a></td>
                                                        </tr>
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

                <div class="features section-padding" id="features" style={{"background":"#fff"}}>
                    <div class="container">
                        <div class="row py-lg-5 justify-content-center">
                            <div class="col-xl-6">
                                <div class="section_heading">
                                    <span>Features</span>
                                    <h3>The most trusted cryptocurrency platform</h3>
                                    <p>Here are a few reasons why you should choose Coinbase</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="features-content">
                                    <span><i class="fa fa-shield"></i></span>
                                    <h4>Secure storage</h4>
                                    <p>We store the vast majority of the digital assets in secure offline storage.</p>
                                    <a href="#">Learn more <i class="la la-angle-right"></i></a>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="features-content">
                                    <span><i class="fa fa-cubes"></i></span>
                                    <h4>Protected by insurance</h4>
                                    <p>Cryptocurrency stored on our servers is covered by our insurance policy.</p>
                                    <a href="#">Learn more <i class="la la-angle-right"></i></a>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="features-content">
                                    <span><i class="fa fa-life-ring"></i></span>
                                    <h4>Industry best practices</h4>
                                    <p>Tradientsupports a variety of the most popular digital currencies.</p>
                                    <a href="#">Learn more <i class="la la-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="portfolio section-padding" id="portfolio" style={{"background":"#fff"}}>
                    <div class="container">
                        <div class="row py-lg-5 justify-content-center">
                            <div class="col-xl-6">
                                <div class="section_heading">
                                    <span>Join Us</span>
                                    <h3>Create your cryptocurrency portfolio today</h3>
                                    <p>Tradient has a variety of features that make it the best place to start trading</p>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-xl-5 col-md-6">
                                <div class="portfolio_list">
                                    <div class="media">
                                        <span class="port-icon"> <i class="la la-bar-chart"></i></span>
                                        <div class="media-body">
                                            <h4>Manage your portfolio</h4>
                                            <p>Buy and sell popular digital currencies, keep track of them in the one place.</p>
                                        </div>
                                    </div>
                                    <div class="media">
                                        <span class="port-icon"> <i class="la la-calendar-check-o"></i></span>
                                        <div class="media-body">
                                            <h4>Recurring buys</h4>
                                            <p>Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or
                                            monthly.
                                    </p>
                                        </div>
                                    </div>
                                    <div class="media">
                                        <span class="port-icon"> <i class="la la-lock"></i></span>
                                        <div class="media-body">
                                            <h4>Vault protection</h4>
                                            <p>For added security, store your funds in a vault with time delayed withdrawals.
                                    </p>
                                        </div>
                                    </div>
                                    <div class="media">
                                        <span class="port-icon"> <i class="la la-android"></i></span>
                                        <div class="media-body">
                                            <h4>Mobile apps</h4>
                                            <p>Stay on top of the markets with the Tradient app for <a href="#">Android</a> or
                                        <a href="#">iOS</a>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-7 col-md-6">
                                <div class="portfolio_img">
                                    <img src={require('../../../images/portfolio.png')} alt="" class="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial section-padding" id="testimonial" style={{"background":"#fff"}}>
                    <div class="container">
                        <div class="row py-lg-5 justify-content-center">
                            <div class="col-xl-6">
                                <div class="section_heading">
                                    <span>What's Say</span>
                                    <h3>Trusted by 2 million customers</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-xl-8 col-md-11">
                                <div class="testimonial-content">
                                <Testimonial />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-form section-padding" id="contact" style={{"background":"#fff"}}>
                    <div class="container">
                        <div class="row py-lg-5 justify-content-center">
                            <div class="col-xl-6">
                                <div class="section_heading">
                                    <span>Ask Question</span>
                                    <h3>Let us hear from you directly!</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-4 col-md-4 col-sm-4">
                                <div class="info-list">
                                    <h4 class="mb-3">Address</h4>
                                    <ul>
                                        <li><i class="fa fa-map-marker"></i> California, USA</li>
                                        <li><i class="fa fa-phone"></i> (+880) 1243 665566</li>
                                        <li><i class="fa fa-envelope"></i> hello@example.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-8 col-md-8 col-sm-8">
                                <form method="post" name="myform" class="contact_validate">
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group">
                                                <label for="contactName">
                                                    Full name
                                        </label>
                                                <input type="text" class="form-control" id="contactName" placeholder="Full name"
                                                    name="firstname" />
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group">
                                                <label for="contactEmail">
                                                    Email
                                        </label>
                                                <input type="email" class="form-control" name="email"
                                                    placeholder="hello@domain.com" />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <textarea class="form-control p-3" name="message" rows="5"
                                                    placeholder="Tell us what we can help you with!"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary px-4">
                                        Send message
                            </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}
export default Landing;
