import {
	useState,
	useEffect
} from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk/es/utils/amount-formatter';

import './App.css';
import logo from './logo.svg';
import { aeternitySDK } from "./utils/aeternity";

const App = () => {
	const [client, clientReady] = useState(null);

	useEffect(() => {
    try {
			(async () => {
				let sdk = await aeternitySDK();

				const address = await sdk.address();
				const balance = await sdk.balance(address, {
					format: AE_AMOUNT_FORMATS.AE,
				});

				console.log("Current Address:", address);
				console.log("Current Balance:", balance + AE_AMOUNT_FORMATS.AE);

				clientReady(true);		
			})();
		} catch (err) {
			console.error('SDK not loaded correctly or loaded for the first time', err);

			clientReady(false)
		}
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
					{
						client
						? "See console for the connected account details"
						: "Account not connected"
					}
        </p>
        <a
          className="App-link"
          href="https://aeternity.com/awesome-aeternity"
          target="_blank"
          rel="noopener noreferrer"
        >
					awesome æternity
        </a>
      </header>
    </div>
  );
};

export default App;
