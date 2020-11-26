import {types} from "../../types/partner";
import {
	call,
	put,
	takeLatest,
	select,
} from 'redux-saga/effects';
import {
	loadPartnerCustomers,
	approveApplication,
	loadFutureInstallments,
	loadPastInstallments,
	loadInvoices,
	loadPartnerCreditInformation,
	updateInstallmentComment,
} from "../../../http/http-calls";
import history from "../../../history";
import {getFutureInstallments, getPastInstallments} from "../../selectors/partner";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.LOAD_PARTNER_CUSTOMERS, loadPartnerCustomersSaga);
	yield takeLatest(types.APPROVE_APPLICATION, approveApplicationSaga);
	yield takeLatest(types.LOAD_FUTURE_INSTALLMENTS, loadFutureInstallmentsSaga);
	yield takeLatest(types.LOAD_PAST_INSTALLMENTS, loadPastInstallmentsSaga);
	yield takeLatest(types.LOAD_INVOICES, loadInvoicesSaga);
	yield takeLatest(types.LOAD_PARTNER_CREDIT_INFORMATION, loadPartnerCreditInformationSaga);
	yield takeLatest(types.UPDATE_INSTALLMENT_COMMENT, updateInstallmentCommentSaga);
}

function* loadPartnerCustomersSaga({payload: {partnerId}}) {
	try {
		const res = yield call(loadPartnerCustomers, partnerId);
		yield put({
			type: types.PARTNER_CUSTOMERS_LOADED,
			payload: {
				partnerCustomers: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* approveApplicationSaga({payload: {customerId, data, pathInfo}}) {
	try {
		const res = yield call(approveApplication, customerId, data);
		if (res) {
			if (pathInfo) {
				history.push({
					pathname: pathInfo.pathname,
					from: pathInfo.from,
				});
			}
		}
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadFutureInstallmentsSaga({payload: {partnerId, customerId, data}}) {
	try {
		const res = yield call(loadFutureInstallments, partnerId, customerId, data);

		yield put({
			type: types.FUTURE_INSTALLMENTS_LOADED,
			payload: {
				futureInstallments: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadPastInstallmentsSaga({payload: {partnerId, customerId, data}}) {
	try {
		const res = yield call(loadPastInstallments, partnerId, customerId, data);

		yield put({
			type: types.PAST_INSTALLMENTS_LOADED,
			payload: {
				pastInstallments: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadInvoicesSaga({payload: {partnerId, customerId, data}}) {
	try {
		const res = yield call(loadInvoices, partnerId, customerId, data);

		yield put({
			type: types.INVOICES_LOADED,
			payload: {
				invoices: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadPartnerCreditInformationSaga({payload: {partnerId}}) {
	try {
		const res = yield call(loadPartnerCreditInformation, partnerId);

		yield put({
			type: types.PARTNER_CREDIT_INFORMATION_LOADED,
			payload: {
				creditInformation: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* updateInstallmentCommentSaga({payload: {installmentId, data}}) {
	try {
		yield call(updateInstallmentComment, installmentId, data);

		const state = yield select();
		const futureInstallments = getFutureInstallments(state);
		let tempFutureInstallments = futureInstallments && JSON.parse(JSON.stringify(futureInstallments));
		tempFutureInstallments && tempFutureInstallments.map(item => {
			if (item.installment_id === installmentId) {
				item.installment_comment = data.comment;
			}
		});
		yield put({
			type: types.FUTURE_INSTALLMENTS_LOADED,
			payload: {
				futureInstallments: tempFutureInstallments,
			}
		});

		const pastInstallments = getPastInstallments(state);
		let tempPastInstallments = pastInstallments && JSON.parse(JSON.stringify(pastInstallments));
		tempPastInstallments && tempPastInstallments.map(item => {
			if (item.installment_id === installmentId) {
				item.installment_comment = data.comment;
			}
		});
		yield put({
			type: types.PAST_INSTALLMENTS_LOADED,
			payload: {
				pastInstallments: tempPastInstallments,
			}
		});

	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

export default actionWatcher;
