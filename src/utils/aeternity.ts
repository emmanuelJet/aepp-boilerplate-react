import {
	Node,
	AeSdkAepp,
	walletDetector,
	BrowserWindowMessageConnection,
	SUBSCRIPTION_TYPES
} from "@aeternity/aepp-sdk";

import network from "../configs/network";

let aeSdk: AeSdkAepp;

/**
 * Scan for user Wallet
 * 
 * @returns {Promise} Wallet connection status
 */
const scanForWallets = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (!aeSdk) reject("Failed! SDK not initialized.");
		const scannerConnection = new BrowserWindowMessageConnection();
		const handleNewWallet = async ({ wallets, newWallet }: any) => {
			newWallet = newWallet || Object.values(wallets)[0]
			await aeSdk.connectToWallet(await newWallet.getConnection())
			// @ts-ignore
			await aeSdk.subscribeAddress(SUBSCRIPTION_TYPES.subscribe, "current")
			stopScan();
			resolve(newWallet.info.networkId);
		};
		const stopScan = walletDetector(scannerConnection, handleNewWallet.bind(this));
	})
};

/**
 * Wallet connection method 
 * 
 * @returns {Object} AeSdkAepp client
 */
export const initSDK= async () : Promise<{
	walletNetworkId: string, 
	aeSdk: AeSdkAepp
}>  => {
    const node = {
      nodes: [
        {
          name: network.id,
          instance: new Node(network.url),
        },
      ],
      compilerUrl: network.compilerUrl,
    };

    aeSdk = new AeSdkAepp({
      name: "aepp-boilerplate",
		...node,
    } as any);
    
	const walletNetworkId: string = await scanForWallets();

    return { walletNetworkId, aeSdk };
};
