const addSDK = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.sdk = payload;
	return newState;
};

const addAddress = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.address = payload;
	return newState;
};

const addAddressBalance = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.balance = payload;
	return newState;
};

let actionTypes = {
	ADD_SDK: addSDK,
	ADD_ADDRESS: addAddress,
	ADD_ADDRESS_BALANCE: addAddressBalance,
};
export default actionTypes;
