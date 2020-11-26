import {produce} from 'immer';
import {types} from "../../types/user";

const initialState = {
	allUsers: null,
	unregisteredPartners: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ALL_USERS_LOADED:
			return produce(state, draft => {
				draft.allUsers = action.payload.allUsers;
			});
		case types.UNREGISTERED_PARTNERS_LOADED:
			return produce(state, draft => {
				draft.unregisteredPartners = action.payload.unregisteredPartners;
			});

		default:
			return state;
	}
};
