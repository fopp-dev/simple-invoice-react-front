import {types} from "../../types/customer";
import {
	takeLatest,
	put,
	call,
} from 'redux-saga/effects';
import {
	loadCustomerPersons,
	saveStep1,
	saveStep2,
	saveStep3,
	saveStep4,
	submitApplication,
	loadInstallmentsNotFullyPaid,
	loadCustomerCreditInformation,
	loadNextPayment,
} from "../../../http/http-calls";
import history from "../../../history";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.SAVE_STEP_ONE, saveStepOneSaga);
	yield takeLatest(types.SAVE_STEP_TWO, saveStepTwoSaga);
	yield takeLatest(types.SAVE_STEP_THREE, saveStepThreeSaga);
	yield takeLatest(types.SAVE_STEP_FOUR, saveStepFourSaga);
	yield takeLatest(types.SUBMIT_APPLICATION, submitApplicationSaga);
	yield takeLatest(types.LOAD_CUSTOMER_PERSONS, loadCustomerPersonsSaga);
	yield takeLatest(types.LOAD_INSTALLMENTS_NOT_FULLY_PAID, loadInstallmentsNotFullyPaidSaga);
	yield takeLatest(types.LOAD_CUSTOMER_CREDIT_INFORMATION, loadCustomerCreditInformationSaga);
	yield takeLatest(types.LOAD_NEXT_PAYMENT, loadNextPaymentSaga);
}

function* saveStepOneSaga({payload: {customerId, data}}) {
	try {
		yield call(saveStep1, customerId, data);
		history.push({pathname: '/customer-step2', from: '/customer-step1'});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* saveStepTwoSaga({payload: {customerId, data}}) {
	try {
		yield call(saveStep2, customerId, data);
		history.push({pathname: '/customer-step3', from: '/customer-step2'});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* saveStepThreeSaga({payload: {customerId, data}}) {
	try {
		const res = yield call(saveStep3, customerId, data);

		yield put({
			type: types.CUSTOMER_PERSONS_LOADED,
			payload: {
				customer: res,
			}
		});

		history.push({pathname: '/customer-step4', from: '/customer-step3'});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* saveStepFourSaga({payload: {customerId, data, pathInfo}}) {
	try {
		yield call(saveStep4, customerId, data);

		if (pathInfo && pathInfo.pathname) {
			history.push({
				pathname: pathInfo.pathname,
				from: pathInfo.from,
			});
		}
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* submitApplicationSaga() {
	try {
		yield call(submitApplication, null);
		history.push({pathname: '/', from: '/customer-step5'});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadCustomerPersonsSaga({payload: {customerId}}) {
	try {
		const res = yield call(loadCustomerPersons, customerId);

		yield put({
			type: types.CUSTOMER_PERSONS_LOADED,
			payload: {
				persons: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadInstallmentsNotFullyPaidSaga({payload: {customerId}}) {
	try {
		const res = yield call(loadInstallmentsNotFullyPaid, customerId);

		yield put({
			type: types.INSTALLMENTS_NOT_FULLY_PAID_LOADED,
			payload: {
				installmentsNotFullyPaid: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadCustomerCreditInformationSaga({payload: {customerId}}) {
	try {
		const res = yield call(loadCustomerCreditInformation, customerId);

		yield put({
			type: types.CUSTOMER_CREDIT_INFORMATION_LOADED,
			payload: {
				creditInformation: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadNextPaymentSaga({payload: {customerId}}) {
	try {
		const res = yield call(loadNextPayment, customerId);

		yield put({
			type: types.NEXT_PAYMENT_LOADED,
			payload: {
				nextPayment: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

export default actionWatcher;
