import {produce} from 'immer';
import {types} from "../../types/auth";

const initialState = {
	token: localStorage.getItem('mtaji-token'),
	role: localStorage.getItem('role'),
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.USER_INFO:
			return produce(state, draft => {
				draft.token = action.payload.token;
				draft.role = action.payload.role;
			});

		default:
			return state;
	}
};
