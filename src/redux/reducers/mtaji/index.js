import {produce} from 'immer';
import {types} from "../../types/mtaji";

const initialState = {
	partners: null,
	customers: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ALL_PARTNERS_LOADED:
			return produce(state, draft => {
				draft.partners = action.payload.partners;
			});
		case types.ALL_CUSTOMERS_LOADED:
			return produce(state, draft => {
				draft.customers = action.payload.customers;
			});

		default:
			return state;
	}
};
