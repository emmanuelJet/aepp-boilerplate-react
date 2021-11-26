import './App.css';
import logo from './logo.svg';
import useAeternitySDK from './hooks/useAeternitySDK';

const App = () => {
	const client = useAeternitySDK();

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
