import actionTypes from "../actions/actionTypes";

const initialState = {
	sdk: {},
	address: '',
	balance: ''
};

const rootReducer = (state = initialState, action) => {
	if (action.type in actionTypes) {
		return actionTypes[action.type](state, action.payload);
	} 

	return state;
};

export default rootReducer;