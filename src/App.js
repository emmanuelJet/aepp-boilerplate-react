import {
	useState,
	useEffect
} from 'react';
import { connect } from "react-redux";
import {
	toAe,
	AE_AMOUNT_FORMATS
} from '@aeternity/aepp-sdk/es/utils/amount-formatter';

import './App.css';
import logo from './logo.svg';
import {
  addSDK,
	addAddress,
  addAddressBalance,
} from "./actions/actionCreator";
import { aeternitySDK } from "./utils/aeternity";

const App = ({ dispatch }) => {
	const [client, clientReady] = useState(null);

	useEffect(() => {
    try {
			(async () => {
				const sdkResponse = await aeternitySDK();

				dispatch(addSDK(sdkResponse.client));
				dispatch(addAddress(sdkResponse.address));
				console.log("Current Address:", sdkResponse.address);

				sdkResponse.client.balance(sdkResponse.address).then((value) => {
					let addressBalance = toAe(value) + ' ' + AE_AMOUNT_FORMATS.AE;

					dispatch(addAddressBalance(addressBalance));
					console.log("Current Balance:", addressBalance);
				}).catch(() => '0 ' + AE_AMOUNT_FORMATS.AE);

				clientReady(true);		
			})();
		} catch (err) {
			console.error('SDK not loaded correctly or loaded for the first time', err);

			clientReady(false)
		}
  }, [dispatch]);

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

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(App);
