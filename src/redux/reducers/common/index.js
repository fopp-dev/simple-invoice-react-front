import {produce} from 'immer';
import {types} from "../../types/common";

const initialState = {
	customerDocuments: null,
	customerMain: null,
	creditChangeLog: null,
	errorMessage: '',
	errorCount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CUSTOMER_DOCUMENTS_LOADED:
			return produce(state, draft => {
				draft.customerDocuments = action.payload.customerDocuments;
			});
		case types.CUSTOMER_MAIN_LOADED:
			return produce(state, draft => {
				draft.customerMain = action.payload.customerMain;
			});
		case types.CREDIT_CHANGE_LOG_LOADED:
			return produce(state, draft => {
				draft.creditChangeLog = action.payload.creditChangeLog;
			});
		case types.ERROR_MESSAGE:
			return produce(state, draft => {
				draft.errorMessage = action.payload.message;
				draft.errorCount += 1;
			});

		default:
			return state;
	}
};
