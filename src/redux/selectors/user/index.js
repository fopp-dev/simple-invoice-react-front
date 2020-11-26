import get from 'lodash/get';

export const getAllUsers = (state) => {
	return get(state, "user.allUsers");
};
