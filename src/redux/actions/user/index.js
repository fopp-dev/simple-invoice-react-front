import {types} from '../../types/user';

export const loadAllUsersAction = () => ({
	type: types.LOAD_ALL_USERS,
	payload: {},
});

export const createUserAction = (data) => ({
	type: types.CREATE_USER,
	payload: {
		user: data,
	},
});
