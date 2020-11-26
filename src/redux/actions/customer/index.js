import {types} from '../../types/customer';

export const loadCustomerPersonsAction = (customerId) => ({
	type: types.LOAD_CUSTOMER_PERSONS,
	payload: {
		customerId,
	}
});

export const saveStepOneAction = (customerId, data) => ({
	type: types.SAVE_STEP_ONE,
	payload: {
		customerId,
		data
	},
});

export const saveStepTwoAction = (customerId, data) => ({
	type: types.SAVE_STEP_TWO,
	payload: {
		customerId,
		data,
	}
});

export const saveStepThreeAction = (customerId, data) => ({
	type: types.SAVE_STEP_THREE,
	payload: {
		customerId,
		data,
	}
});

export const saveStepFourAction = (customerId, data, pathInfo) => ({
	type: types.SAVE_STEP_FOUR,
	payload: {
		customerId,
		data,
		pathInfo,
	}
});

export const loadInstallmentsNotFullyPaidAction = (customerId) => ({
	type: types.LOAD_INSTALLMENTS_NOT_FULLY_PAID,
	payload: {
		customerId,
	}
});

export const loadCustomerCreditInformationAction = (customerId) => ({
	type: types.LOAD_CUSTOMER_CREDIT_INFORMATION,
	payload: {
		customerId,
	}
});

export const loadNextPaymentAction = (customerId) => ({
	type: types.LOAD_NEXT_PAYMENT,
	payload: {
		customerId,
	}
});
