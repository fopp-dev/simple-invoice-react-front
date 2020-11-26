import {types} from '../../types/common';

export const loadCustomerDocuments = (customerId) => ({
	type: types.LOAD_CUSTOMER_DOCUMENTS,
	payload: {
		customerId,
	},
});

export const loadCustomerMain = (customerId) => ({
	type: types.LOAD_CUSTOMER_MAIN,
	payload: {
		customerId,
	},
});

export const loadCreditChangeLogAction = (customerId) => ({
	type: types.LOAD_CREDIT_CHANGE_LOG,
	payload: {
		customerId,
	},
});
