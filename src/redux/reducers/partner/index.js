import {produce} from 'immer';
import {types} from "../../types/partner";

const initialState = {
	partnerCustomers: null,
	futureInstallments: null,
	pastInstallments: null,
	invoices: null,
	creditInformation: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PARTNER_CUSTOMERS_LOADED:
			return produce(state, draft => {
				draft.partnerCustomers = action.payload.partnerCustomers;
			});
		case types.FUTURE_INSTALLMENTS_LOADED:
			return produce(state, draft => {
				draft.futureInstallments = action.payload.futureInstallments;
			});
		case types.PAST_INSTALLMENTS_LOADED:
			return produce(state, draft => {
				draft.pastInstallments = action.payload.pastInstallments;
			});
		case types.INVOICES_LOADED:
			return produce(state, draft => {
				draft.invoices = action.payload.invoices;
			});
		case types.PARTNER_CREDIT_INFORMATION_LOADED:
			return produce(state, draft => {
				draft.creditInformation = action.payload.creditInformation;
			});

		default:
			return state;
	}
};
