/**
 * Testnet & Mainnet nodeConfig
 * 
 * @returns {Object} æ node config
 */
const nodeConfig = {
	testnet: {
		name: "ae_uat",
		url: "https://testnet.aeternity.io",
		middlewareUrl: "https://testnet.aeternity.io/mdw",
	},
	mainnet: {
		name: "ae_mainnet",
		url: "https://mainnet.aeternity.io",
		middlewareUrl: "https://mainnet.aeternity.io/mdw",
	},
	compilerUrl: "https://compiler.aepps.com",
};

export default nodeConfig;
