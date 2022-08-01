import {
	useRef,
	useState,
	useEffect
} from 'react';

import { initSDK } from "../utils/aeternity";

/**
 * æternitySDK Hook 
 * 
 * @returns {Object} æpp client
 */
const useAeternitySDK = () => {
	const client = useRef();

	const [connecting, setConnecting] = useState(false);
	const [clientReady, setClientReady] = useState(false);
	const [clientError, setClientError] = useState(null);

	useEffect(() => {
		(async () => {
				setClientError(null);
				setConnecting(true);
				try {
					client.current = await initSDK();
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
