import get from 'lodash/get';

export const getCustomerPersons = (state) => {
	return get(state, "customer.persons");
};

export const getInstallmentsNotFullyPaid = (state) => {
	return get(state, 'customer.installmentsNotFullyPaid');
};

export const getCustomerCreditInformation = (state) => {
	return get(state, 'customer.creditInformation');
};

export const getNextPaymemt = (state) => {
	return get(state, 'customer.nextPayment');
};
