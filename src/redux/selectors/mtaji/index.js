import get from 'lodash/get';

export const getAllPartners = (state) => {
	return get(state, "mtaji.partners");
};

export const getAllCustomers = (state) => {
	return get(state, 'mtaji.customers');
};
