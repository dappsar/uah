const sigUtil = require('eth-sig-util');
var Election = artifacts.require('./Election.sol');
var Destructible = artifacts.require('./Destructible.sol');

var c1 = "CNCO";
var c2 = "Luis Fonzi";
var c3 = "Daddy Yankee";
var c4 = "Maluma";
var c5 = "Ozuna";

var h1 = sigUtil.typedSignatureHash([{
  type: 'string',
  name: 'Mensaje',
  value: 'Votar a ' + c1
}]);
var h2 = sigUtil.typedSignatureHash([{
  type: 'string',
  name: 'Mensaje',
  value: 'Votar a ' + c2
}]);
var h3 = sigUtil.typedSignatureHash([{
  type: 'string',
  name: 'Mensaje',
  value: 'Votar a ' + c3
}]);
var h4 = sigUtil.typedSignatureHash([{
  type: 'string',
  name: 'Mensaje',
  value: 'Votar a ' + c4
}]);
var h5 = sigUtil.typedSignatureHash([{
  type: 'string',
  name: 'Mensaje',
  value: 'Votar a ' + c5
}]);

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Destructible).then(function () {
    deployer.link(Destructible, Election)
    return deployer.deploy(Election, [c1, c2, c3, c4, c5], [h1, h2, h3, h4, h5])
  });
};
