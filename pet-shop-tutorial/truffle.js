module.exports = {
  networks: {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    rinkeby: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "4",
        from: "0x1dBD543B3b09139B876E8185F16A541E37De29dD",
        gas: 4700000
    },
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
