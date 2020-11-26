import {types} from "../../types/auth";
import {types as commonTypes} from '../../types/common';
import * as jwt_decode from 'jwt-decode';
import {
	takeLatest,
	put,
	call,
} from 'redux-saga/effects';
import {login} from "../../../http/http-calls";
import {CUSTOMER_APPLICATION_STATUS, CUSTOMER_REGISTRATION_STEPS, userRoles} from "../../../constants";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.LOGIN, loginSaga);
}

function* loginSaga({payload: {data, history}}) {
	try {
		const res = yield call(login, data);
		const details = jwt_decode(res.token);
		const role = details.role;
		localStorage.setItem('mtaji-token', res.token);
		localStorage.setItem('role', role);

		yield put({
			type: types.USER_INFO,
			payload: {
				token: res.token,
				role: role,
			}
		});

		if (role === userRoles.mtaji_global_credit) {
			history.push('/mtaji-dashboard');
		} else if (role === userRoles.mtaji_local_credit) {
			history.push('/mtaji-dashboard');
		} else if (role === userRoles.mtaji_local_admin) {
			history.push('/mtaji-dashboard');
		} else if (role === userRoles.partner) {
			history.push('/partner-dashboard');
		} else if (role === userRoles.customer) {
			const customer = res.customer;

			if (checkCustomerSubmitted(customer.logs)) {
				if (checkCustomerActivated(customer.logs)) {
					history.push('/customer-dashboard');
				} else {
					history.push('/customer-not-activated');
				}
			} else {
				history.push('/customer-step1');
			}
		}
	} catch (e) {
		yield put({
			type: commonTypes.ERROR_MESSAGE,
			payload: {
				message: e.response.data.message,
			}
		});
		handleErrorIfAvailable(e.response.data);
	}
}

function checkCustomerSubmitted(logs) {
	const index = logs && logs.findIndex(log => {
		return (
			log.applicationStep === CUSTOMER_REGISTRATION_STEPS["2_SUBMIT_APPLICATION"] &&
			log.status === CUSTOMER_APPLICATION_STATUS.COMPLETED
		);
	});

	return (index !== -1);
}

function checkCustomerActivated(logs) {
	const items = logs && logs.filter(log => (
		log.status === CUSTOMER_APPLICATION_STATUS.COMPLETED
	));

	return (items && items.length) === 5;
}

export default actionWatcher;
