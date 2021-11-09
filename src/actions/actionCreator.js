const addSDK = (sdk) => ({
	type: "ADD_SDK",
	payload: sdk,
});

const addAddress = (address) => ({
	type: "ADD_ADDRESS",
	payload: address,
});

const addAddressBalance = (balance) => ({
	type: "ADD_ADDRESS_BALANCE",
	payload: balance,
});

export {
	addSDK,
	addAddress,
	addAddressBalance
};
