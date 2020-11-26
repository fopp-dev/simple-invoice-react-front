import {types} from "../../types/user";
import {
	takeLatest,
	put,
	call,
} from 'redux-saga/effects';
import {
	loadAllUsers,
	createUser,
} from "../../../http/http-calls";
import {handleErrorIfAvailable} from "../../../http/http-service";

function* actionWatcher() {
	yield takeLatest(types.LOAD_ALL_USERS, loadAllUsersSaga);
	yield takeLatest(types.CREATE_USER, createUserSaga);
}

function* loadAllUsersSaga() {
	try {
		const res = yield call(loadAllUsers);

		yield put({
			type: types.ALL_USERS_LOADED,
			payload: {
				allUsers: res,
			}
		});
	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

function* createUserSaga({payload: {user}}) {
	try {
		const res = yield call(createUser, user);

	} catch (e) {
		handleErrorIfAvailable(e.response.data);
		console.log(e.response.data);
	}
}

export default actionWatcher;
