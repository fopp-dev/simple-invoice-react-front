import get from 'lodash/get';

export const getToken = (state) => {
	return get(state, "auth.token");
};

export const getRole = (state) => {
	return get(state, "auth.role");
};

