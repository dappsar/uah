
# PEC 2 - Ejercicio 3 - SWARM

Puede reutilizar parte de lo que ha realizado en el ejercicio 2 (hasta subir el proyecto a GitHub). Arranque un nodo de Swarm y aloje la DApp (Proyecto truffle pet-shop). Además, vincule el ENS adquirido con la DApp de tal forma que una url como la de a continuación muestre la aplicación. Por ejemplo: http://localhost:8500/bzz:/swarmtest.test/index.html

Debe ser capaz de utilizar la aplicación al igual que en localhost (por ejemplo: con
MetaMask). Adjunte el hash (manifest) de Swarm asociado con la aplicación.

## Introducción

* Se seguirán las instrucciones de la [página oficial de swarm](https://swarm-guide.readthedocs.io/en/latest/gettingstarted.html).

* La instalación se realiza en forma local, en windows, a falta un nodo completo de Rinkeby.

## Dependencias a instalar

* Se instala [TDM-GCC](http://tdm-gcc.tdragon.net/download) necesario para instalar swarm con Go en windows (más información en el siguiente [link](https://stackoverflow.com/questions/43580131/exec-gcc-executable-file-not-found-in-path-when-trying-go-build))

* Se incorpora el path (C:\TDM-GCC-64\bin) en donde quedó instalado TDM-GCC, a la variable de entorno PATH.

![TDM GCC Install](images/tdm-gcc-install.png?raw=true "TDM GCC Install")

## Instalación de SWARM

Se realiza la instalación de swarm para Windows, siguiendo las instrucciones del siguiente [link](https://github.com/ethereum/go-ethereum/tree/master/swarm#building-the-source):
(ya se cuenta con go y nodeJs instalados, de los ejercicios anteriores)

```
# Importante: Ejecutar en una consola de Windows, con permisos de Administrador

go get -d github.com/ethereum/go-ethereum
go install github.com/ethereum/go-ethereum/cmd/swarm
```

![Swarm Install](images/swarm-windows.png?raw=true "Swarm Install")


## Asociación con la cuenta local

Se asocia la cuenta local (eth.coinbase) con swarm.

![coinbase](images/coinbase.png?raw=true "coinbase")

```
# Inicio estándar
swarm --bzzaccount 0x505708ad4ab39308537376d63a403e86c2dd8259 --bzzapi http://127.0.0.1:8500/ --datadir=d:\\desarrollo\\geth\\acc1

# Inicio con la dirección (0x200da6cf71ae10564210ead718d6cea7b08f6063) del ENS Registry contrato desplegado en local, en el ejercicio 1)
swarm --bzzaccount 0x505708ad4ab39308537376d63a403e86c2dd8259 --bzzapi 0x200da6cf71ae10564210ead718d6cea7b08f6063@d:\\desarrollo\\geth\\acc1\  --datadir=d:\\desarrollo\\geth\\acc1
```

![swarm sync](images/swarm-sync.png?raw=true "swarm sync")


## Validación de swarm funcionando

Verificamos que swarm esta on-line, ingresando a [http://localhost:8500](http://localhost:8500)

![swarm localhost](images/swarm-localhost.png?raw=true "swarm localhost")

## Despliegue de la DApp en Swarm

Se sube la aplicación pet-shop, trabajada en los ejericios anteriores, siguiendo las instrucciones oficiales, que se pueden encontrar en el siguiente [link](https://swarm-guide.readthedocs.io/en/latest/up-and-download.html).

```
# la indicación del defaultPath, es para que tome el index.html como pagina por defecto y la indicación recursive, es para tomar todo el directorio.
swarm --defaultpath dist/index.html --recursive up dist

# hash obtenido
5bcb8065b8c8841639eb0a69245ca4660c217fc8acdc0a9e5072f5742d11d227

```

## Vinculación del ENS adquirido

Se realiza la creación de un nuevo dominio y se vincula la aplicación desplegada en Swarm con ese dominio.

```
personal.unlockAccount(eth.coinbase, null, 150000)

loadScript("ensutils-testnet.js")

testRegistrar.register(web3.sha3('dbaranowski.st'), eth.coinbase, {from: eth.coinbase})

publicResolver.address

ens.owner(namehash('dbaranowski.st.test'))

ens.setResolver(namehash('dbaranowski.st.test'), publicResolver.address, {from: eth.coinbase})

ens.resolver(namehash('dbaranowski.st.test'))

publicResolver.setContent(namehash('dbaranowski.st.test'),'0x5bcb8065b8c8841639eb0a69245ca4660c217fc8acdc0a9e5072f5742d11d227', {from: eth.coinbase, gas: 100000})

```

![swarm ENS](images/swarm-ens.png?raw=true "swarm ENS")


## Visualización de la app en Swarm

![swarm App](images/swarm-app.png?raw=true "swarm App")
