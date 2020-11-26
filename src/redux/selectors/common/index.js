import get from 'lodash/get';

export const getCustomerDocuments = (state) => {
	return get(state, "common.customerDocuments");
};

export const getCustomerMain = (state) => {
	return get(state, "common.customerMain");
};

export const getCreditChangeLog = (state) => {
	return get(state, "common.creditChangeLog");
};

export const getErrorMessage = (state) => {
	return get(state, 'common.errorMessage');
};

export const getErrorCount = (state) => {
	return get(state, 'common.errorCount');
};
