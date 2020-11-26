import {all} from "redux-saga/effects";
import auth from './auth';
import partner from './partner';
import customer from './customer';
import user from './user';
import common from './common';
import mtaji from './mtaji';

export default function* rootSaga() {
	yield all([
		auth(),
		partner(),
		customer(),
		user(),
		common(),
		mtaji(),
	])
};
