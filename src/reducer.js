import * as actions from './actions';
import { initialState } from './context';

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.SET_APP: {
			return {
				...state,
				...payload,
			};
		}

		default:
			return state;
	}
};
