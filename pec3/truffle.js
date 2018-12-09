// I'll use Infura for publishing packages along with the truffle-hdwallet-provider NPM module
// and a 12-word hd-wallet mnemonic that represents our Ethereum address on the Ropsten network.
var HDWalletProvider = require("truffle-hdwallet-provider");

// Allows us to use ES6 in our migrations and tests.
//require('babel-register');

// 12-word mnemonic
var mnemonic = "flag general wool clog tunnel video clump bread close scene fortune grief";
var keyRopsten = "a5db99b0500d4f2f93d14aacd5040843";
var keyRinkeby = "a5db99b0500d4f2f93d14aacd5040843";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1", // localhost
      port: 7545, // port used with / configured in ganache
      network_id: "*", // Match any network id
      gas: 6721975
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + keyRopsten),
      network_id: 3, // official id of the ropsten network,
      gas: 4200000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + keyRinkeby),
      network_id: 4, // official id of the rinkeby network,
      gas: 1803609
    }
  }
};