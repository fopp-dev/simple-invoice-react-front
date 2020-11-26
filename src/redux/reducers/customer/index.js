import {produce} from 'immer';
import {types} from "../../types/customer";

const initialState = {
	customerMain: null,
	persons: null,
	documents: null,
	creditInformation: null,
	nextPayment: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CUSTOMER_PERSONS_LOADED:
			return produce(state, draft => {
				draft.persons = action.payload.persons;
			});

		case types.INSTALLMENTS_NOT_FULLY_PAID_LOADED:
			return produce(state, draft => {
				draft.installmentsNotFullyPaid = action.payload.installmentsNotFullyPaid;
			});
		case types.CUSTOMER_CREDIT_INFORMATION_LOADED:
			return produce(state, draft => {
				draft.creditInformation = action.payload.creditInformation;
			});
		case types.NEXT_PAYMENT_LOADED:
			return produce(state, draft => {
				draft.nextPayment = action.payload.nextPayment;
			});

		default:
			return state;
	}
};
