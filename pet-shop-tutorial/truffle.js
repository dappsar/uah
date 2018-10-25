module.exports = {
  networks: {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4",
      from: "0x7b51bfdd0fc002981eaf6529726adba44482d0f9",
      gas: 4700000
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};