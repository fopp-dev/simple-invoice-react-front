import {types} from "../../types/mtaji";
import {
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';
import {
	loadAllPartners,
	loadAllCustomers,
} from "../../../http/http-calls";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.LOAD_ALL_PARTNERS, loadAllPartnersSaga);
	yield takeLatest(types.LOAD_ALL_CUSTOMERS, loadAllCustomersSaga);
}

function* loadAllPartnersSaga() {
	try {
		const res = yield call(loadAllPartners);
		yield put({
			type: types.ALL_PARTNERS_LOADED,
			payload: {
				partners: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadAllCustomersSaga() {
	try {
		const res = yield call(loadAllCustomers);
		yield put({
			type: types.ALL_CUSTOMERS_LOADED,
			payload: {
				customers: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

export default actionWatcher;
