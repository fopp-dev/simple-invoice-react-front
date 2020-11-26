import { combineReducers } from "redux";
import auth from './auth';
import customer from './customer';
import user from './user';
import partner from './partner';
import common from './common';
import mtaji from './mtaji';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
	auth: auth,
	customer: customer,
	user: user,
	partner: partner,
	common: common,
	mtaji: mtaji,
	toastr: toastrReducer // <- Mounted at toastr.
});

export default rootReducer;
