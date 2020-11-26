import {types} from "../../types/common";
import {
	takeLatest,
	put,
	call,
} from 'redux-saga/effects';
import {
	loadCreditChaneLog,
	loadCustomerDocuments,
	loadCustomerMain,
} from "../../../http/http-calls";
import {CUSTOMER_REGISTRATION_STEPS} from "../../../constants";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.LOAD_CUSTOMER_DOCUMENTS, loadCustomerDocumentsSaga);
	yield takeLatest(types.LOAD_CUSTOMER_MAIN, loadCustomerMainSaga);
	yield takeLatest(types.LOAD_CREDIT_CHANGE_LOG, loadCreditChaneLogSaga);
}

// load customer documents by customer id instead of user id
function* loadCustomerDocumentsSaga({payload: {customerId}}) {
	try {
		const res = yield call(loadCustomerDocuments, customerId);
		// filter to show only customer submitted documents
		const tempDocuments = JSON.parse(JSON.stringify(res.documents));
		const tempPersons = JSON.parse(JSON.stringify(res.persons));

		const documents = tempDocuments && tempDocuments.filter(item => (
			item.applicationStep === CUSTOMER_REGISTRATION_STEPS["2_SUBMIT_APPLICATION"]
		));

		const signedDocuments = tempDocuments && tempDocuments.filter(item => (
			item.applicationStep === CUSTOMER_REGISTRATION_STEPS["3_PARTNER_APPROVE_APPLICATION"]
		));

		const finalDocuments = tempDocuments && tempDocuments.filter(item => (
			item.applicationStep === CUSTOMER_REGISTRATION_STEPS["8_SIGN_LOAN_DOCUMENTS"]
		));

		// person filtering
		const finalPersons = tempPersons && tempPersons.map(person => {
			const documents = person.documents && person.documents.filter(document =>
				document.applicationStep === CUSTOMER_REGISTRATION_STEPS["8_SIGN_LOAN_DOCUMENTS"]
			);

			return {
				...person,
				documents
			};
		});

		const persons = tempPersons && tempPersons.map(person => {
			const documents = person.documents && person.documents.filter(document =>
				document.applicationStep === CUSTOMER_REGISTRATION_STEPS["2_SUBMIT_APPLICATION"]
			);

			return {
				...person,
				documents
			};
		});

		yield put({
			type: types.CUSTOMER_DOCUMENTS_LOADED,
			payload: {
				customerDocuments: {
					...res,
					documents,
					persons,
					signedDocuments,
					finalDocuments,
					finalPersons
				},
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadCustomerMainSaga({payload: {customerId}}) {
	try {
		const customerMain = yield call(loadCustomerMain, customerId);
		yield put({
			type: types.CUSTOMER_MAIN_LOADED,
			payload: {
				customerMain: customerMain,
			}
		})
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* loadCreditChaneLogSaga({payload: {customerId}}) {
	try {
		const creditChangeLog = yield call(loadCreditChaneLog, customerId);
		yield put({
			type: types.CREDIT_CHANGE_LOG_LOADED,
			payload: {
				creditChangeLog: creditChangeLog,
			}
		})
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

export default actionWatcher;
