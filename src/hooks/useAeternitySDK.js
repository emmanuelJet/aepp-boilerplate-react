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
	const [client, clientReady] = useState(null);
	const [connecting, setConnecting] = useState(false);
	const [sdkError, setSdkError] = useState(null);

	useEffect(() => {
		(async () => {
				setSdkError(null);
				setConnecting(true);
				try {
					const client = await initSDK()
					clientReady(client);
				} catch (err) {
					setSdkError(err);
				}
				setConnecting(false);
		})();
  }, [client]);
	return [client, connecting, sdkError];
}

export default useAeternitySDK;
