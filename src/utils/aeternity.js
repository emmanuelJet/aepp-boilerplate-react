import { 
	Node,
	RpcAepp
} from "@aeternity/aepp-sdk/es";
import { toAe, AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk/es/utils/amount-formatter';
import WalletDetector from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector";
import BrowserWindowMessageConnection from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message";

import store from "../store";
import nodeConfig from "../configs/node";

let client;

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

				let address = client.address();
				if (!address) return;

				detector.stopScan()
				resolve(address);
			}
    });
  });
};


export const aeternitySDK = async (state) => {
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
		state = store.getState();

    client = await RpcAepp({
      name: "aepp-boilerplate",
			...node,
			onNetworkChange: async (params) => {
				client.selectNode(params.networkId);

				state.sdk = client;
				state.address = await client.address();
				client.balance(state.address).then((value) => {
					let stateBalance = toAe(value) + ' ' + AE_AMOUNT_FORMATS.AE;

					state.balance = stateBalance;
				}).catch(() => '0 ' + AE_AMOUNT_FORMATS.AE);
			},
			onAddressChange:  async (addresses) => {
				state.sdk = client;
				state.address = await client.address();
				client.balance(state.address).then((value) => {
					let stateBalance = toAe(value) + ' ' + AE_AMOUNT_FORMATS.AE;

					state.balance = stateBalance;
				}).catch(() => '0 ' + AE_AMOUNT_FORMATS.AE);
			},
      onDisconnect() {
        store.dispatch('resetState');
      },
    });
    
		let scannedAddress = await scanForWallets();

    return { client, scannedAddress };
  } catch (err) {
    console.error(err);
    return;
  }
};
