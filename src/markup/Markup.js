import React, {Component} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import BuySell from './Pages/NotUsed/BuySell';
import Accounts from './Pages/NotUsed/Accounts';
import Settings from './Pages/NotUsed/Settings';
import SettingsAccount from './Pages/NotUsed/SettingsAccount';
import SettingsPreferences from './Pages/NotUsed/SettingsPreferences';
import SettingsSecurity from './Pages/NotUsed/SettingsSecurity';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Otp1 from './Pages/NotUsed/Otp1';
import Otp2 from './Pages/NotUsed/Otp2';
import Lock from './Pages/NotUsed/Lock';
import Reset from './Pages/Reset';
import AddBank from './Pages/NotUsed/AddBankAcc';
import AddCard from './Pages/NotUsed/AddDebitCard';
import Verify1 from './Pages/NotUsed/Verify1';
import Verify2 from './Pages/NotUsed/Verify2';
import Verify3 from './Pages/NotUsed/Verify3';
import Verify4 from './Pages/NotUsed/Verify4';
import Verify5 from './Pages/NotUsed/Verify5';
import Verify6 from './Pages/NotUsed/Verify6';
import History from './Pages/NotUsed/History';
import Footer from './Layout/Footer';
import Landing from './Pages/NotUsed/landing';
import {CustomerPrivateRoute} from './Routes/CustomerPrivateRoute';
import {PartnerPrivateRoute} from "./Routes/PartnerPrivateRoute";
import CustomerRegister from "./Pages/CustomerRegister";
import Step1 from './Pages/Step1';
import Step2 from './Pages/Step2';
import Step3 from './Pages/Step3';
import Step4 from './Pages/Step4';
import Step5 from './Pages/Step5';
import PartnerDashboard from "./Pages/PartnerDashboard";
import CustomerOverview from "./Pages/CustomerOverview";
import {MtajiPrivateRoute} from "./Routes/MtajiPrivateRoute";
import MtajiDashboard from "./Pages/MtajiDashboard";
import history from "../history";
import UserAdministration from "./Pages/UserAdministration";
import CreateUser from "./Pages/CreateUser";
import EditUser from "./Pages/EditUser";
import {connect} from "react-redux";
import {getRole} from "../redux/selectors/auth";
import {userRoles} from "../constants";
import CustomerNotActivated from "./Pages/CustomerNotActivated";
import ApproveApplication from "./Pages/ApproveApplication";
import FinalDocumentSign from "./Pages/FinalDocumentSign";
import ActivateCredit from "./Pages/ActivateCredit";
import {PrivateRoute} from './Routes/PrivateRoute';
import CloseCredit from "./Pages/CloseCredit";
import ChangeCredit from "./Pages/ChangeCredit";
import RegisterSales from "./Pages/RegisterSales";
import RegisterPayment from "./Pages/RegisterPayment";
import UploadBankStatement from "./Pages/UploadBankStatement";
import CustomerDashboard from "./Pages/CustomerDashboard";

class Markup extends Component {
	render() {
		const role = this.props.role;
		let redirectUrl = '/signin';
		if (role === userRoles.customer) {
			redirectUrl = '/customer-dashboard';
		} else if (role === userRoles.partner) {
			redirectUrl = '/partner-dashboard';
		} else if (
			role === userRoles.mtaji_global_credit ||
			role === userRoles.mtaji_local_credit ||
			role === userRoles.mtaji_local_admin
		) {
			redirectUrl = '/mtaji-dashboard';
		}

		return (
			<Router history={history}>
				<div id="main-wrapper" className="dashboard">
					<Switch>
						<PrivateRoute path='/customer-overview/:id' component={CustomerOverview}/>
						<PartnerPrivateRoute path='/partner-dashboard' component={PartnerDashboard}/>
						<PartnerPrivateRoute path='/customer-register' component={CustomerRegister}/>
						<PartnerPrivateRoute path='/approve-application/:id' component={ApproveApplication}/>
						<PartnerPrivateRoute path='/final-document-sign/:id' component={FinalDocumentSign}/>
						<PartnerPrivateRoute path='/register-sales/:id' component={RegisterSales}/>
						<PartnerPrivateRoute path='/register-payment/:id' component={RegisterPayment}/>
						<PartnerPrivateRoute path='/upload-bank-statement' component={UploadBankStatement}/>

						<MtajiPrivateRoute path='/mtaji-dashboard' component={MtajiDashboard}/>
						<MtajiPrivateRoute path='/mtaji-user-administration' component={UserAdministration}/>
						<MtajiPrivateRoute path='/create-user' component={CreateUser}/>
						<MtajiPrivateRoute path='/edit-user/:id' component={EditUser}/>
						<MtajiPrivateRoute path='/activate-credit/:id' component={ActivateCredit}/>
						<MtajiPrivateRoute path='/close-credit/:id' component={CloseCredit}/>
						<MtajiPrivateRoute path='/change-credit/:id' component={ChangeCredit}/>

						<CustomerPrivateRoute path='/customer-dashboard' component={CustomerDashboard}/>
						<CustomerPrivateRoute path='/customer-step1' component={Step1}/>
						<CustomerPrivateRoute path='/customer-step2' component={Step2}/>
						<CustomerPrivateRoute path='/customer-step3' component={Step3}/>
						<CustomerPrivateRoute path='/customer-step4' component={Step4}/>
						<CustomerPrivateRoute path='/customer-step5' component={Step5}/>
						<CustomerPrivateRoute path='/customer-not-activated' component={CustomerNotActivated}/>

						<Route path='/signin' component={Signin}/>
						<Route path='/reset' component={Reset}/>

						{/*<Route path='/' exact component={Homepage}/>*/}
						<Route path='/buysell' component={BuySell}/>
						<Route path='/accounts' component={Accounts}/>
						<Route path='/settings' component={Settings}/>
						<Route path='/settingsAccount' component={SettingsAccount}/>
						<Route path='/settingsPreferences' component={SettingsPreferences}/>
						<Route path='/settingsSecurity' component={SettingsSecurity}/>
						<Route path='/signup' component={Signup}/>
						<Route path='/otp1' component={Otp1}/>
						<Route path='/otp2' component={Otp2}/>
						<Route path='/lock' component={Lock}/>
						<Route path='/addBank' component={AddBank}/>
						<Route path='/addCard' component={AddCard}/>
						<Route path='/verify1' component={Verify1}/>
						<Route path='/verify2' component={Verify2}/>
						<Route path='/verify3' component={Verify3}/>
						<Route path='/verify4' component={Verify4}/>
						<Route path='/verify5' component={Verify5}/>
						<Route path='/verify6' component={Verify6}/>
						<Route path='/history' component={History}/>
						<Route path='/landing' component={Landing}/>
						<Redirect to={redirectUrl}/>
					</Switch>
					<Footer/>
				</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	role: getRole(state),
});

export default connect(
	mapStateToProps,
	null
)(Markup);
