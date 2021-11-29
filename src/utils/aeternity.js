import {
	Node,
	RpcAepp,
	WalletDetector,
	BrowserWindowMessageConnection
} from "@aeternity/aepp-sdk";

import nodeConfig from "../configs/node";

let client;

/**
 * Scan for user Wallet
 * 
 * @returns {bool} Wallet connection status
 */
const scanForWallets = () => {
	if (!client) throw new Error("Execute aeternitySDK first");
  const scannerConnection = BrowserWindowMessageConnection({
    connectionInfo: { id: 'spy' }
  });
  const detector = WalletDetector({ connection: scannerConnection });

	return new Promise((resolve) => {
    detector.scan(async ({ newWallet }) => {
      if (!newWallet) return;

			await client.connectToWallet(await newWallet.getConnection())
			await client.subscribeAddress("subscribe", "current")

			detector.stopScan()
			resolve(true);
    });
  });
};

/**
 * Wallet connection method 
 * 
 * @returns {Object} RpcAepp client
 */
export const aeternitySDK = async () => {
  try {
    const node = {
      nodes: [
        {
          name: nodeConfig.testnet.name,
          instance: await Node({
            url: nodeConfig.testnet.url,
            internalUrl: nodeConfig.testnet.middlewareUrl,
          }),
        },
				{
          name: nodeConfig.mainnet.name,
          instance: await Node({
            url: nodeConfig.mainnet.url,
            internalUrl: nodeConfig.mainnet.middlewareUrl,
          }),
        }
      ],
      compilerUrl: nodeConfig.compilerUrl,
    };

    client = await RpcAepp({
      name: "aepp-boilerplate",
			...node,
			onNetworkChange: async (params) => {
				client.selectNode(params.networkId);
			}
    });
    
		await scanForWallets();

    return client;
  } catch (err) {
    console.error("SDK not loaded correctly", err);
    return;
  }
};
