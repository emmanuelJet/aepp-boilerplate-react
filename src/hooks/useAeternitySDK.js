import { useRef, useState, useEffect } from 'react';
import { AmountFormatter } from '@aeternity/aepp-sdk';

import { aeternitySDK } from "../utils/aeternity";

const useAeternitySDK = () => {
	let sdk = useRef();
	const [client, clientReady] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				sdk.current = await aeternitySDK();

				let address = await sdk.current.address();
				let balance = await sdk.current.balance(address, {
					format: AmountFormatter.AE_AMOUNT_FORMATS.AE
				});

				console.log("Current Address:", address);
				console.log("Current Balance:", balance + AmountFormatter.AE_AMOUNT_FORMATS.AE);
				clientReady(sdk.current);
			} catch (err) {
				console.error("Error fetching aeternitySDK", err);
				clientReady(false)
			}
		})();
  }, [sdk]);

	return client;
}

export default useAeternitySDK;
