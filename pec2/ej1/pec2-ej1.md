# PEC 2 - Ejercicio 1 - ENS

Adquiera un dominio bajo el TLD (Top Level Domain) ‘.test’ en la testnet que desee (Rinkeby o Ropsten).
Si no le es posible sincronizar un nodo, puede desplegar el servicio ENS en la red testrpc
con Geth.

## Despliegue en **red Local**

### Instalación de requisitos

Se realizó la prueba de desplegar el dominio en forma local, en una red de ethereum propia y con sistema operativo Windows. Para ello, hubo que instalar algunos componentes, que se indican debajo. Se omite la instalación de nodeJs.

#### [Truffle](http://truffleframework.com/docs/getting_started/installation)
 Necesario para compilación y despliegue de los contratos de ENS en la red local.
```
# Para instalarlo con nodeJs
npm install -g truffle
```

#### [Ethereum Wallet](https://github.com/ethereum/mist/releases/tag/v0.11.1)
Una simple UI (parte de Mist, pero solo la Wallet), para tener una interfaz y ver las billeteras y su saldo.
```
# Se descargó de:
https://github.com/ethereum/mist/releases
# Al ser Windows, se ejecutó solamente dandole doble click al ícono ejecutable que generó.
```

![Ethereum Wallet](images/ethereum-wallet.png?raw=true "Ethereum Wallet")

#### [Geth](https://github.com/ethereum/go-ethereum/wiki/Installation-instructions-for-Windows)
 
Se instaló el cliente **geth** con la creación de una *blockchain propia*, como se realizó en la [PEC1, ejercicio 1](https://github.com/dappsar/uah/blob/master/pec1/ej1/pec1-ej1.md). El único cambio, fue que aca se descargó el binario para windows: (https://geth.ethereum.org/downloads/).

![Get Startup](images/geth-startup.png?raw=true "Get Startup")


```
# Luego de crear la blockchain con el archivo genésis y la cuenta base (coinbase), se inició la blockchain con:
geth --rpc --networkid 1999 --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi "web3,eth" --rpccorsdomain "*" --datadir acc1
```

#### Modificaciones en archivo [ensutils.js](https://github.com/ensdomains/ens/blob/master/ensutils.js)
* Archivos complementarios: Se descargó el achivo de javascript ensutils (su versión para la [mainnet](https://github.com/ensdomains/ens/blob/master/ensutils.js), para [testnet](https://github.com/ensdomains/ens/blob/master/ensutils-testnet.js) y la [modificación para Rinkeby](https://gist.githubusercontent.com/MichalZalecki/db02810da8e582d0494adb2c5fd31f3c/raw/58feec55b99d10559b881ec5480c2d72a0445d99/ensutils-rinkeby.js)), que tiene algunas funciones requeridas para manejarnos con ENS. En ese arhivo se cambiaron las direcciones de los contratos de ENS y del Resolver, por las generadas en nuestra propia blockchain, del resultado de Truffle.

```
# ENS
var ens = ensContract.at('0x200da6cf71ae10564210ead718d6cea7b08f6063');

# Resolver
var publicResolver = resolverContract.at('0xd766d1797aef5f89508332bd14cacd9ee63b3c27');
```

#### Despliegue de contratos [ENS](http://docs.ens.domains/en/latest/deploying.html)

Al tener la red local, para poder registrar el nombre, también se tuvo que instalar los contratos de ENS en forma local. Para ello, se descargó el [código fuente](https://github.com/ensdomains/ens) de los contratos de ENS, se compilaron y desplegaron con truffle en la red local, ingresando luego las direcciones obtenidas en el [ensutils-testnet.js](ensutils-testnet.js), tanto para el contrato **ENSRegistry** como para el contrato **PublicResolver**. Se dejan documentadas las instrucciones realizadas:

* Descargar el [código fuente](https://github.com/ensdomains/ens

* Instalar las dependencias de nodeJs

```
npm install
```

* Modificar el archivo 2_deploy_contracts.js ([archivo modificado](ens/migrations/2_deploy_contracts.js)), para incorporar el despliegue del contrato PublicResolver:
```
# Incorporar la referencia al contrato PublicResolver
const PublicResolver = artifacts.require('./PublicResolver.sol');

# Incorporar el despliegue del contrato PublicResolver (segundo "then")
  deployer.deploy(ENS)
    .then(() => {
      // Deploy the FIFSRegistrar and bind it with ENS
      return deployer.deploy(FIFSRegistrar, ENS.address, rootNode.namehash);
    })
    .then(function() {
      return deployer.deploy(PublicResolver, ENS.address);
    })
    .then(function() {
      // Transfer the owner of the `rootNode` to the FIFSRegistrar
      ENS.at(ENS.address).setSubnodeOwner('0x0', rootNode.sha3, FIFSRegistrar.address);
    });

# Cambir la variable TLD de "eth" a "test"
var tld = 'test';
```


* Nos conectamos a la consola (en éste caso, al ser desde windows, el comando a ingresar, tiene algún "truquito" con las "/" por temas de path de windows)
```
geth attach ipc:\\.\pipe\geth.ipc
```

* Se desbloqueó la cuenta (0x505708ad4ab39308537376d63a403e86c2dd8259) para poder desplegar el contrato:
```
personal.unlockAccount(eth.coinbase)
```

* Se inició la minería para hacer efectivas las transacciones con los contratos
```
miner.start()
```

![ENS Inicio](images/ens-inicio.png?raw=true "ENS Inicio")


* Realizar la compilación y despliegue de los contratos (se especifica la red **dev.fifs**, que es la indicada en el archivo truffle.js)

```
truffle migrate --network dev.fifs

# Resultado
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x936fa342611c1801377ff744908b0aa07faaf66a4ac57d5d093d1c778d974765
  Migrations: 0x55cd34f945834a61f9136f315e9e717609702dfd
Saving successful migration to network...
  ... 0x2b54d3f6d6fbdc70cf2a67940457c1e6f8eeae3d1494fc8b9ac6c276d9281a7c
Saving artifacts...
Running migration: 2_deploy_contracts.js
test
  Deploying ENSRegistry...
  ... 0xf00f06a9869e55306132f1f4a72e9428291c335b048509f954dbc81a2d3cdbf9
  ENSRegistry: 0x200da6cf71ae10564210ead718d6cea7b08f6063
  Deploying FIFSRegistrar...
  ... 0xea7957569f25ccccd8aedf9b0463c8c48cf1ff0db97b52e1222731fceda9768a
  FIFSRegistrar: 0x574e2071ea1d70cbd5735db51bb2df8ae61570d4
  Deploying PublicResolver...
  ... 0x361f7ed6ca913ae1353eb0622b583326bc7dadce71d617d3f1b30ff52bb53c86
  PublicResolver: 0xd766d1797aef5f89508332bd14cacd9ee63b3c27
Saving successful migration to network...
  ... 0xe01e7fea729088ee8c89d861c7bc37e312ad6795ad2959023cf83ef07ccedca1
  ... 0xb5debc060e308ca79b5269fe4cbd54ae63bb4bcb90bcaa5471489a8618e2e0b2
Saving artifacts...
```

![ENS Truffle Migrate](images/ens-truffle-migrate.png?raw=true "ENS Truffle Migrate")

![ENS Truffle Migrate Address](images/ens-truffle-migrate-address.png?raw=true "ENS Truffle Migrate Address")


#### Despliegue de contratos en Ethereum Wallet

Para ver / revisar los contratos con una UI, se desplegaron en Ethereum Wallet. Para ello, nos conectamos a la consola de Truffle, para obtener la dirección de los contratos (ENS y Resolver) y el ABI correspondiente, que son los datos requeridos en la UI de Ethereum Wallet para incorporarlos.

```
# Conexión a la consola de Truffle
truffle1 console --network dev.fifs

# Obtención de la dirección del contrato ENS
ENSRegisy.address
# Resultado: '0x200da6cf71ae10564210ead718d6cea7b08f6063'

# Obtención del ABI del contrato ENS
JSON.stringify(ENSRegistry.abi)

# Obtención de la dirección del contrato PublicResolver
PublicResolver.address
# Resultado: '0xd766d1797aef5f89508332bd14cacd9ee63b3c27'

# Obtención del ABI del contrato PublicResolver
JSON.stringify(PublicResolver.abi)
```

![ENS Truffle Console Registry](images/truffle-console-ens-registry.png?raw=true "ENS Truffle Console Registry")

![ENS Truffle Console Resolver](images/truffle-console-ens-resolver.png?raw=true "ENS Truffle Console Resolver")

Esas direcciones y ABI se cargaron en Ethereum Wallet

![Ethereum Wallet Alta](images/ethereum-wallet-alta.png?raw=true "Ethereum Wallet Alta")

![Ethereum Wallet Contracts](images/ethereum-wallet-contracts.png?raw=true "Ethereum Wallet Contracts")


### Registración del dominio

Luego de instalado los requisitos, se comienza con la registración del dominio, desde la consola de Geth. Los pasos realizados fueron:

* Cargar el archivo de scripts ensutils-testnet
```
loadScript("./ensutils-testnet.js")
```

* Verificar la disponibilidad del dominio:
```
# Es necesario enviar el nombre con la conversión a sha3
# Si retorna 0 (o una fecha anterior a la actual para la segunda opción), es que el dominio está disponible.
Opción 1: testRegistrar.expiryTimes(web3.sha3("dbaranowski.2"))
Opción 2: new Date(testRegistrar.expiryTimes(web3.sha3('dbaranowski.2')).toNumber() * 1000)
```

* Desbloquear la cuenta y configurarla en la variable defaultAccount de web3.
```
personal.unlockAccount(eth.accounts[0])
web3.eth.defaultAccount = web3.eth.accounts[0]
```

* Registrar el dominio
```
testRegistrar.register(web3.sha3('dbaranowski2'), eth.accounts[0], {from: eth.accounts[0]})
```

* Validar la registración
```
eth.accounts[0]
ens.owner(namehash("dbaranowski2.test"))
```

* Configurar el resolver, para que el dominio pueda resolver una dirección
```
ens.setResolver(namehash('dbaranowski2.test'), publicResolver.address, {from: eth.coinbase})
```

* Relacionar la cuenta utilizada con el nombre de dominio
```
publicResolver.setAddr(namehash("dbaranowski2.test"), eth.coinbase, {from: eth.coinbase})
```

* Evidenciar que somos propietarios del dominio
```
# Con ésta instrucción, se obtiene el owner del dominio
ens.owner(namehash('dbaranowski2.test'))

# También se puede obtener la dirección del resolver utilizado:
ens.resolver(namehash('dbaranowski2.test'))

# y verificamos que la dirección anterior es también la del public resolver:
publicResolver.address

# y, por último, la cuenta asociada al dominio que es la misma que la cuenta base que tenemos
getAddr('dbaranowski2.test')
eth.coinbase
```

![Domain Register](images/domain-register.png?raw=true "Domain Register")


### Otras herramientas probadas / utilizadas

En el armado del ambiente local, también se descargó, instaló y se hicieron algunas pruebas con [ganache-cli](https://github.com/trufflesuite/ganache-cli), [ethereum-testrpc](https://www.npmjs.com/package/ethereumjs-testrpc).

### Alternativa al despliegue de contratos ENS con Truffle

A la alternativa de lo indicado para la instalación de los contratos ENS, se siguieron las instrucciones oficales de [http://docs.ens.domains/en/latest/deploying.html](http://docs.ens.domains/en/latest/deploying.html), para hacer el despliegue de los contratos desde la consola de Geth. 



```
# Nos conectamos a la consola (en éste caso, al ser desde windows, el comando a ingresar, tiene algún "truquito" con las "/" por temas de path de windows)
geth attach ipc:\\.\pipe\geth.ipc

# Se desbloqueó la cuenta (0x505708ad4ab39308537376d63a403e86c2dd8259) para poder desplegar el contrato:
personal.unlockAccount(eth.coinbase)

# Se inició la minería para hacer efectivas las transacciones con los contratos
miner.start()
```

![ENS Inicio](images/ens-inicio.png?raw=true "ENS Inicio")

```
# Se desplegó la "registry" de ENS (según indicaciones de [la documentación oficial de ENS]([http://docs.ens.domains/en/latest/deploying.html])), copiando el código siguiente en la consola

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

# Resultado:
Contract mined! address: 0xe050305080082c3fed72f168f06221d282a1a94b transactionHash: 0x545f166b0d5924eca5b211f762a593fc126a1a719f24a715da4a45c374b74da3
```

![ENS Registry](images/ens-registry.png?raw=true "ENS Registry")


```
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

# Resultado:
Contract mined! address: 0xcda43c719c337a8407ad2242f7741e92d9f9ebca transactionHash: 0x1ddb9022810496dc549c0a017973467c5d1902d5bb7af7e0a94503afc1fd7db9
```

![ENS Registrar](images/ens-registrar.png?raw=true "ENS Registrar")


```
# Luego de que fueron minadas las transacciones de esos dos contratos, se transfirió la propiedad a la cuenta base:
ens.setOwner(0, registrar.address, {from: web3.eth.accounts[0]});

#Resultado:
"0x17cbb372c27437d59c2649a4ee91a75aedefab24ca457d6baaec45e4691f235a"
```

![ENS Transfer](images/ens-transfer.png?raw=true "ENS transfer")

El resultado de las direcciones, fue incorporado a [ensutils-testnet.js](ensutils-testnet.js), línea 220 y línea 1314:
```
#linea  220: var ens = ensContract.at('0xe050305080082c3fed72f168f06221d282a1a94b');
#línea 1314: var publicResolver = resolverContract.at('0xcda43c719c337a8407ad2242f7741e92d9f9ebca');
```

Luego, se probó la registración del dominio, tal cual los pasos indicados anteriormente. 

-------

## Despliegue en **RINKEBY**

Se probó desplegar en Rinkeby, aunque no se terminó con la sincronización luego de varios días de ejecución. Se dejan los pasos realizados.

* Primero hubo que sincronizar la red rinkeby, para lograr tener un nodo completo. Se siguieron las instrucciones, del siguiente [link](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc). Se dejan en el readme los comandos más importantes (que también están en el tutorial indicado arriba):
```
# Sincornización de rinkeby
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024 --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr 0.0.0.0

# Inicio de la consola de geth, conectándose a la red rinkeby
geth --datadir=$HOME/.ethereum/rinkeby attach ipc:$HOME/.ethereum/rinkeby/geth.ipc console
```

### Registración del dominio

La registración del dominio en **Rinkeby**, es igual que para la registración local, solo que cambia el script utilizado ensutils.js. En lugar de [ensutils-testnet.js](ensutils-testnet.js), se utilizó [ensutils-rinkeby.js](ensutils-rinkeby.js). Ahí cambia la dirección del contrato que tiene el ENS y el Public Resolver.



-------

## Comentarios finales

### Error con Truffle en Windows
En las imagenes se puede ver el comando **"truffle1"** en lugar de **"truffle"**. Eso es debido a un tema de Script en windows, que se resolvió renombrando el cmd de truffle que queda en la carpeta de npm, de truffle a truffle1. El error que daba es *"Error: The method net_version does not exist/is not available"* y se puede ver más información en https://github.com/trufflesuite/truffle/issues/788).

