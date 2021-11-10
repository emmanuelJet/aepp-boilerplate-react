# æpp boilerplate ReactJS frontend

This boilerplate allows everyone to easy start when building an æpp with ReactJS on top of the æternity ecosystem. It contains three critical parts:

- A custom GitHub Action
- The aepp-sdk-js
- Easy wallet discovery

## Get started

Clone repo via git or use the template button above.

Install the dependencies

```bash
npm install
```

For development purposes (hot-reloading)

```bash
npm start
```

To build the bundle for production

```bash
npm run build
```

For running the integration tests

```bash
npm test
```

## Main Features

### Custom GitHub Action

We engineered this GitHub Action config to be as versatile as possible while being transparent to the developer. There are no hidden config files and a minimal set of presets where necessary.

`build_and_deploy.yml`: This Action configuration file named *æpp CI/CD* is used to build and deploy the æpp boilerplate. It represents a GitHub Action file that performs actions on push changes to the main GitHub branch. The action config performs two main jobs of building and deployment.
The build job installs the required NPM dependencies using three node versions (12.x, 14.x, 16.x) then executes the ```npm run build``` command to prepare the production-ready files for deployment.
The deploy job continues the action workflow to deploy the already prepared production-ready files using gh-pages. This deploy process creates/updates the *gh-pages* branch that previews the æpp-boilerplate via the provided GitHub Repo Page Link.

> You can include a test job if you wish to test your æpp for results before deployment.

### aepp-sdk-js integration

This dependency is imported and should work out of the box with this implementation. An initialized client is provided by the `aeternity.js` file as used in the `App.js` file to discover a connected wallet.

### Easy wallet discovery

Since we aim to make this boilerplate as universally connective as possible, we implemented an easy wallet discovery feature to get the connected Superhero wallet address and AE balance. This process started from the `aeternity.js` file that uses the imported `aepp-sdk-js` dependency to create an ```aeternitySDK``` method that initializes a _RpcAepp_ client with a wallet scanning feature using the ```BrowserWindowMessageConnection``` and ```WalletDetector``` functions.
The ```aeternitySDK``` method is then used in the `App.js` file to get the connected wallet address and initialized client that provides the AE balance for the connection address.
