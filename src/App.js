import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

import './App.css';
import logo from './logo.svg';
import useAeternitySDK from './hooks/useAeternitySDK';
import network from "./configs/network";
import { useEffect, useState } from 'react';



const App = () => {
	const [res, connecting, sdkError] = useAeternitySDK();
	const [address, setAddress] = useState(null);
	const [balance, setBalance] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	
	let aeSdk;
	
	const onNetworkChange = function (params) {
		updateAccountDetails(params.networkId)
	}

	const updateAccountDetails = async function (walletNetworkId) {
		if (status !== WalletConnectionStatus.Error && walletNetworkId !== network.id) {
			setErrorMsg(`Connected to the wrong network "${walletNetworkId}". please switch to "${network.id}" in your wallet.`)
			status = WalletConnectionStatus.Error;
		} else if(status !== WalletConnectionStatus.Connected){
			status = WalletConnectionStatus.Connected;
			setAddress(await aeSdk.address())
			setBalance(await aeSdk.getBalance(address, {
				format: AE_AMOUNT_FORMATS.AE
			}));
		}
	}

	useEffect(()=>{
		if (!connecting && res) {
			aeSdk = res.aeSdk;
			aeSdk.onNetworkChange = onNetworkChange;
			updateAccountDetails(res.walletNetworkId);
		}
	}, [connecting])

	const WalletConnectionStatus = Object.freeze({
		Error: 0,
		Connecting: 1,
		Connected: 2,
	});

	let status = WalletConnectionStatus.Connecting;






	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					{status === WalletConnectionStatus.Connecting &&
						<span>Searching for Wallet ...</span>
					}
				</div>
				<div>
					{status === WalletConnectionStatus.Error &&
						<span>{errorMsg}</span>
					}
				</div>
				<div>
					{status === WalletConnectionStatus.Connected &&
						<div>
							<h6>Account address: {address}</h6>
							<h6>Balance: {balance}</h6>
						</div>
					}
				</div>
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
