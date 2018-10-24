# PEC 2 - Ejercicio 1 - ENS

Adquiera un dominio bajo el TLD (Top Level Domain) ‘.test’ en la testnet que desee (Rinkeby o Ropsten).
Si no le es posible sincronizar un nodo, puede desplegar el servicio ENS en la red testrpc
con Geth.

## Despliegue en **red Local**

### Instalación de requisitos

Se realizó la prueba de desplegar el dominio en forma local, en una red de ethereum propia y con sistema operativo Windows. Para ello, hubo que instalar algunos componentes, que se indican debajo. Se omite la instalación de nodeJs + npm.

* [Truffle](http://truffleframework.com/docs/getting_started/installation): Necesario para compilación y despliegue de los contratos de ENS en la red local.
```
# Para instalarlo con nodeJs
npm install -g truffle
```

* [Ethereum Wallet](): Una simple UI (parte de Mist, pero solo la Wallet), para tener una interfaz y ver las billeteras y su saldo. 
```
# Se descargó de:
https://github.com/ethereum/mist/releases
# Al ser Windows, se ejecutó solamente dandole doble click al ícono ejecutable que nos generó
```

* [Geth](https://github.com/ethereum/go-ethereum/wiki/Installation-instructions-for-Windows): 
Se instaló el cliente **geth** con la creación de una *blockchain propia*, como se realizó en la [PEC1, ejercicio 1](https://github.com/dappsar/uah/blob/master/pec1/ej1/pec1-ej1.md). El único cambio, fue que aca se descargó el binario para windows 
(https://geth.ethereum.org/downloads/).

```
# Luego de crear la blockchain con el archivo genésis y la cuenta base (coinbase), se inició la blockchain con:
geth --rpc --networkid 1999 --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi "web3,eth" --rpccorsdomain "*" --datadir acc1
```

* [ENS](http://docs.ens.domains/en/latest/deploying.html): Al tener la red local, para poder registrar el nombre, también se tuvo que instalar los contratos de ENS en forma local. Para ello, se siguieron las instrucciones oficiales de: [http://docs.ens.domains/en/latest/deploying.html](http://docs.ens.domains/en/latest/deploying.html).

```
# Se desbloqueó la cuenta para poder desplegar el contrato:
personal.unlockAccount(eth.coinbase)

# Se inició la minería para hacer efectivas las transacciones con los contratos
miner.start()

# Se desplegó la "registry" de ENS, copiando el código siguiente en la consola

var ensContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"label","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setSubnodeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"ttl","type":"uint64"}],"name":"setTTL","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"ttl","outputs":[{"name":"","type":"uint64"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"ttl","type":"uint64"}],"name":"NewTTL","type":"event"}]);
var ens = ensContract.new({
    from: web3.eth.accounts[0],
    data: "0x33600060000155610220806100146000396000f3630178b8bf60e060020a600035041415610023576020600435015460405260206040f35b6302571be360e060020a600035041415610047576000600435015460405260206040f35b6316a25cbd60e060020a60003504141561006b576040600435015460405260206040f35b635b0fc9c360e060020a6000350414156100b8576000600435015433141515610092576002565b6024356000600435015560243560405260043560198061020760003960002060206040a2005b6306ab592360e060020a6000350414156101165760006004350154331415156100df576002565b6044356000600435600052602435602052604060002001556044356040526024356004356021806101e660003960002060206040a3005b631896f70a60e060020a60003504141561016357600060043501543314151561013d576002565b60243560206004350155602435604052600435601c806101ca60003960002060206040a2005b6314ab903860e060020a6000350414156101b057600060043501543314151561018a576002565b602435604060043501556024356040526004356016806101b460003960002060206040a2005b6002564e657754544c28627974657333322c75696e743634294e65775265736f6c76657228627974657333322c61646472657373294e65774f776e657228627974657333322c627974657333322c61646472657373295472616e7366657228627974657333322c6164647265737329",
    gas: 4700000
}, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
});

# Se desplegó el contraro "registrar", copiando el siguiente código en la consola de geth:
var registrarContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"subnode","type":"bytes32"},{"name":"owner","type":"address"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"ensAddr","type":"address"},{"name":"node","type":"bytes32"}, {"name": "_startDate", "type": "uint256"}],"type":"constructor"}]);
var registrar = registrarContract.new(
    ens.address,
    0,
    0,
    {from: web3.eth.accounts[0],
    data: "0x60606040818152806101c4833960a0905251608051600080546c0100000000000000000000000080850204600160a060020a0319909116179055600181905550506101768061004e6000396000f3606060405260e060020a6000350463d22057a9811461001e575b610002565b34610002576100f4600435602435600154604080519182526020808301859052815192839003820183206000805494830181905283517f02571be3000000000000000000000000000000000000000000000000000000008152600481018390529351879592949193600160a060020a03909316926302571be3926024808201939182900301818787803b156100025760325a03f11561000257505060405151915050600160a060020a038116158015906100ea575033600160a060020a031681600160a060020a031614155b156100f657610002565b005b60008054600154604080517f06ab5923000000000000000000000000000000000000000000000000000000008152600481019290925260248201899052600160a060020a03888116604484015290519216926306ab59239260648084019382900301818387803b156100025760325a03f11561000257505050505050505056",
    gas: 4700000
}, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
});

# Luego de que fueron minadas las transacciones de esos dos contratos, se transfirió la propiedad a la cuenta base:
ens.setOwner(0, registrar.address, {from: web3.eth.accounts[0]});
```

* Archivos complementarios: Se descargó el achivo de javascript [ensutils.js](https://github.com/ensdomains/ens/blob/master/ensutils.js), que tiene algunas funciones requeridas para manejarnos con ENS. En ese arhivo se cambiaron las direcciones de los contratos de ENS y del Resolver, por las generadas en nuestra propia blockchain.


### Registración del dominio

* Se deja el archivo del punto anterior, en el path en donde ingresamos a la consola. Luego, ingresamos el siguiente comando para cargarlo:
```
loadScript("./ensutils.js")
```

* Se verifica la disponibilidad del dominio:
```
# Es necesario enviar el nombre con la conversión a sha3
# Si retorna 0 (o una fecha anterior a la actual para la segunda opción), es que el dominio está disponible.
Opción 1: testRegistrar.expiryTimes(web3.sha3("dbaranowski.2"))
Opción 2: new Date(testRegistrar.expiryTimes(web3.sha3('dbaranowski.2')).toNumber() * 1000)
```

* Para registrar el dominio, hay que desbloquear la cuenta y también setear la cuenta en la variable defaultAccount de web3.
```
personal.unlockAccount(eth.accounts[0])
web3.eth.defaultAccount = web3.eth.accounts[0]
```

* Se registra el dominio
```
testRegistrar.register(web3.sha3('dbaranowski2'), eth.accounts[0], {from: eth.accounts[0]})
```

* Se valida la registración
```
eth.accounts[0]
ens.owner(namehash("dbaranowski2test"))
```

* Se configura el resolver, para que el dominio pueda resolver una dirección
```
ens.setResolver(namehash('dbaranowski2test'), publicResolver.address, {from: eth.coinbase})
```

* Se relaciona la cuenta utilizada con el nombre de dominio
```
publicResolver.setAddr(namehash("dbaranowski2test"), eth.coinbase, {from: eth.coinbase})
```

* Para evidenciar que somos propietarios del dominio, ingresamos
```
# Con ésta instrucción, se obtiene el owner del dominio
ens.owner(namehash('dbaranowski2test'))

# También se puede obtener la dirección del resolver utilizado:
ens.resolver(namehash('dbaranowski2test'))

# y verificamos que la dirección anterior es también la del public resolver:
publicResolver.address

# y, por último, la cuenta asociada al dominio que es la misma que la cuenta base que tenemos
getAddr('dbaranowski2test')
eth.coinbase
```


### Otras opciones probadas

En el armado del ambiente local, también se descargó, instaló y se hicieron algunas pruebas con [ganache-cli](https://github.com/trufflesuite/ganache-cli), [ethereum-testrpc](https://www.npmjs.com/package/ethereumjs-testrpc) y se descararon,compilaron y desplegaron los contratos de ENS desde el [código fuente](https://github.com/ensdomains/ens). 


## Despliegue en **RINKEBY**

Se probó desplegar en Rinkeby, aunque no se terminó con la sincronización luego de varios días de ejecución. Se dejan los pasos realizados.

* Primero hubo que sincronizar la red rinkeby, para lograr tener un nodo completo. Se siguieron las instrucciones, del siguiente [link](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc). Se dejan en el readme los comandos más importantes (que tambiénn están en el tutorial indicado arriba):
```
# Sincornización de rinkeby
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024 --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr 0.0.0.0

# Inicio de la consola de geth, conectándose a la red rinkeby
geth --datadir=$HOME/.ethereum/rinkeby attach ipc:$HOME/.ethereum/rinkeby/geth.ipc console
```

### Registración del dominio

La registración del dominio es igual que para la registración local, cambia el script utilizado, que en lugar de [ensutils.js](https://github.com/ensdomains/ens/blob/master/ensutils.js), se utilizó [ensutils-rinkeby.js](https://gist.github.com/MichalZalecki/db02810da8e582d0494adb2c5fd31f3c#file-ensutils-rinkeby-js).