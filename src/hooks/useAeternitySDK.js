import {
	useState,
	useEffect
} from 'react';
import { AmountFormatter } from '@aeternity/aepp-sdk';

import { aeternitySDK } from "../utils/aeternity";

const useAeternitySDK = () => {
	const [client, clientReady] = useState(null);
	console.log("Client Status", client);

	useEffect(() => {
		(async () => {
			let sdk = await aeternitySDK();

			if (!sdk) {
				console.error("Error fetching aeternitySDK");

				clientReady(false)
			}

			let address = await sdk.address();
			let balance = await sdk.balance(address, {
				format: AmountFormatter.AE_AMOUNT_FORMATS.AE
			});

			console.log("Current Address:", address);
			console.log("Current Balance:", balance + AmountFormatter.AE_AMOUNT_FORMATS.AE);

			clientReady(true);
		})();
  }, []);
}

export default useAeternitySDK;
