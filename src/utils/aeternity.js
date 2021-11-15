import { 
	Node,
	RpcAepp
} from "@aeternity/aepp-sdk/es";
import WalletDetector from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector";
import BrowserWindowMessageConnection from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message";

import store from "../store";
import nodeConfig from "../configs/node";

let client, address;

const scanForWallets = () => {
	if (!client) throw new Error("Use aeternitySDK first");
  const scannerConnection = BrowserWindowMessageConnection({
    connectionInfo: { id: 'spy' }
  });
  const detector = WalletDetector({ connection: scannerConnection });

	return new Promise((resolve) => {
    detector.scan(async ({ newWallet }) => {
      if (!newWallet) return;

			if (window.confirm(`Do you want to connect to wallet ${newWallet.name}`)) {
				await client.connectToWallet(await newWallet.getConnection())
				await client.subscribeAddress("subscribe", "current")

				let scannedAddress = client.address();
				if (!scannedAddress) return;

				detector.stopScan()
				resolve(scannedAddress);
			}
    });
  });
};


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
				client.balance(address);
			},
      onDisconnect() {
        store.dispatch('resetState');
      }
    });
    
		address = await scanForWallets();

    return { client, address };
  } catch (err) {
    console.error(err);
    return;
  }
};
