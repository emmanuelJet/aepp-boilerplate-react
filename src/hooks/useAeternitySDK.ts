import { AeSdkAepp } from '@aeternity/aepp-sdk';
import {
	useRef,
	useState,
	useEffect,
	MutableRefObject
} from 'react';

import { initSDK } from "../utils/aeternity";

/**
 * æternitySDK Hook 
 * 
 * @returns {Object} æpp client
 */
const useAeternitySDK = () => {
	const client: MutableRefObject<{
		walletNetworkId: string, 
		aeSdk: AeSdkAepp
	}> | MutableRefObject<null> = useRef(null);

	const [connecting, setConnecting] = useState(false);
	const [clientReady, setClientReady] = useState(false);
	const [clientError, setClientError] = useState<any>(null);

	useEffect(() => {
		(async () => {
				setClientError(null);
				setConnecting(true);
				try {
					client.current = await initSDK() as any;
					setClientReady(true);
				} catch (err) {
					setClientError(err);
					setClientReady(false);
				} finally {
					setConnecting(false);
				}
		})();
  }, []);
	return [client, clientReady, connecting, clientError];
}

export default useAeternitySDK;
