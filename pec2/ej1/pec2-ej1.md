# PEC 2 - Ejercicio 1 - ENS

Adquiera un dominio bajo el TLD (Top Level Domain) ‘.test’ en la testnet que desee (Rinkeby o Ropsten).
Si no le es posible sincronizar un nodo, puede desplegar el servicio ENS en la red testrpc
con Geth.

## Sincronización de la red rinkeby

Primero hubo que sincronizar la red rinkeby, para lograr tener un nodo completo. Se siguieron las instrucciones, del siguiente [link](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc). 

Se dejan en el readme los comandos más importantes (que tambiénn están en el tutorial indicado arriba):

```
# Sincornización de rinkeby
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024 --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr 0.0.0.0

# Inicio de la consola de geth, conectándose a la red rinkeby
geth --datadir=$HOME/.ethereum/rinkeby attach ipc:$HOME/.ethereum/rinkeby/geth.ipc console
```

## Descarga de archivo complementarios

Luego, basándose en el tutorial [https://michalzalecki.com/register-test-domain-with-ens/](https://michalzalecki.com/register-test-domain-with-ens/), se descargó el archivo complementario [ensutils-rinkeby.js](https://gist.github.com/MichalZalecki/db02810da8e582d0494adb2c5fd31f3c#file-ensutils-rinkeby-js). Ese archivo tiene algunas funciones, requeridas para manejarnos con ENS, además de las direcciones de contrato (*0xe7410170f87102df0055eb195163a03b7f2bff4a*) y resolver (*0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc*) específicas para desplegar ENS en la red Rinkeby.


## Comandos de consola

Se deja el archivo del punto anterior, en el path en donde ingresamos a la consola. Luego, ingresamos el siguiente comando para cargarlo:

```
loadScript("./ensutils-rinkeby.js")
```

## Disponibilidad del dominio

Se verifica la disponibilidad del dominio:

```
# Es necesario enviar el nombre con la conversión a sha3
Opción 1: testRegistrar.expiryTimes(web3.sha3("dbaranowski"))
Opción 2: new Date(testRegistrar.expiryTimes(web3.sha3('dbaranowski')).toNumber() * 1000)
```

Si retorna 0 (o una fecha anterior a la actual para la segunda opción), es que el dominio está disponible.

## Registración del dominio

Para registrar el dominio, hay que ingresar la consola de geth, así desbloqueamos la cuenta y también, seteamos la cuenta en la variable defaultAccount de web3.

```
personal.unlockAccount(eth.accounts[0])
web3.eth.defaultAccount = web3.eth.accounts[0]
```

Luego, para registrar el dominio, se ingresa:

```
testRegistrar.register(web3.sha3('dbaranowski'), eth.accounts[0], {from: eth.accounts[0]})
```

## Validación de propiedad del dominio

Para validar la propiedad del dominio, se ingresa:

```
eth.accounts[0]
ens.owner(namehash("dbaranowski.test")))
```

## Configuración del Resolver

Para que el dominio, resuelva una dirección, es requerido obtener un Resolver. En éste caso, indicamos el Resolver público que esta en el archivo [ensutils-rinkeby.js](ensutils-rinkeby.js): *0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc*.

```
ens.setResolver(namehash('dbaranowski.test'), publicResolver.address, {from: eth.coinbase})
```

Luego, se relaciona la cuenta utilizada con el nombre de dominio:

```
publicResolver.setAddr(namehash("dbaranowski.test"), eth.coinbase, {from: eth.coinbase})
```

## Evidencia de propiedad del dominio

Para evidenciar que somos propietarios del dominio, ingresamos:

```
# Con ésta instrucción, se obtiene el owner del dominio
ens.owner(namehash('dbaranowski.test'))

# También se puede obtener la dirección del resolver utilizado:
ens.resolver(namehash('dbaranowski.test'))

# y verificamos que la dirección anterior es también la del public resolver:
publicResolver.address

# y, por último, la cuenta asociada al dominio que es la misma que la cuenta base que tenemos
getAddr('dbaranowski.test')

eth.coinbase
```
