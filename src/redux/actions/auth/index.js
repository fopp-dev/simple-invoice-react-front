import {types} from '../../types/auth';

export const loginAction = (data, history) => ({
	type: types.LOGIN,
	payload: {
		data,
		history
	},
});
