module.exports = {
  networks: {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    rinkeby: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "4",
        from: "0x94a9c4f8eb4e40e394d9800b69c42a18fee2af7b",
        gas: 4700000
    },
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
