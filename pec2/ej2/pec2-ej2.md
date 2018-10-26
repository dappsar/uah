# PEC 2 - Ejercicio 2 - IPFS

A partir de un truffle project como puede ser la pet-shop utilizada en módulos anteriores, haga una pequeña modificación en su frontend para mostrar su nombre al ejecutar la aplicación. (Puede editar cualquier parámetro adicional, siempre y cuando el nombre sea visible). Suba el truffle project a GitHub (no incluya la carpeta node_modules). Arranque un daemon de IPFS y aloje la DApp (Proyecto truffle pet-shop). Debe ser capaz de utilizar la aplicación al igual que en localhost (por ejemplo: con MetaMask). 

Nota: Como en el ejercicio 1, se realizó el ejercicio sobre red Local (a la falta de un nodo completo en las redes de test) y sobre la red Rinkeby se dejan planteados los comandos.

## Modificación de un proyecto de Truffle

Se utilizó el proyecto [Pet-Shop](https://github.com/dappsar/uah/tree/master/pet-shop-tutorial), en el cual se realizaron varios cambios.

### Incorporación de mi nombre en la página del proyecto

Se modificó el archivo [index.html](https://github.com/dappsar/uah/blob/master/pet-shop-tutorial/src/index.html), para agregar mi nombre, según lo pedido en la PEC.


![Pet Shop](images/pet-shop-nombre.png?raw=true "Pet Shop")

![Pet Shop Adopt](images/pet-shop-adopt.png?raw=true "Pet Shop Adopt")

### Modificación del puerto del provider en app.js

En el archivo app.js del ejemplo pet-shop (tanto en las carpetas src como dist), se encuentra fija la url y puerto del provider, como localhost:7545. Se actualizó el puerto, para corresponderlo con el puerto en donde se está ejecutando localmente la blockchain de rinkeby.

```
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
```

### Cambios en el 'empaquetado' del proyecto

Para subir los archivos a IPFS y SWARM, se empaquetaron en una sola carpeta.  Primero, se instaló webpack, para generar la carpeta **dist/** y copiar los archivos de forma automática, pero detectando algunos problemas y viendo que el javascript, tiene una ruta relativa a un archivo json (pets.json) que necesita el proyecto para funcionar, se terminó por hacer la copia a mano.

Dentro de la carpeta **dist/**, se cambio el archivo *app.js*, en donde se hace uso del archivo *pets.json*, dado que tiene la ruta relativa a una carpeta.  

Se cambió:
"*getJSON(**'../pets.json'**, function(data)*" 

por:
"*getJSON(**'./pets.json'**, function(data)*"

En dicha carpeta, quedaron los siguientes archivos:

* carpeta *images* y todos sus archivos
* *Adoption.json*
* *app.js*
* *index.html*
* *pets.json*

Las referencias a otros archivos Js y css, tal como boostrap, web3 y truffle-contract, se cambiaron en el index.html, para incorporarlos vía un CDN (Content Delivery Network).

### Cambios en la configuración de truffle

En el archivo [truffle.js](../../pet-shop-tutorial/truffle.js), se agregó la red **rinkeby**, para luego desplegar el contrato ahí y estar disponible una vez que el sitio se encuentre en ipfs.


```
module.exports = {
  networks: {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    rinkeby: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "4",
        gas: 6712390
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

----

## Despliegue del contrato

Para poder utilizar la aplicación completa desde ipfs, es requerido tener el contrato desplegado en la red. Para ello, hubo que cargar ethers a la cuenta, desbloquearla y activar la minería (para que se hagan efectivas las transacciones con el despliegue). Luego, desplegar el contrato con truffle.

Se indica los pasos realizados para el despliegue en la red local y en rinkeby, indicando la diferencia según la red en casos particulares. En los que no está indicado, es que el comando es igual para ambas.

### Ejecución del nodo de la red

**Rinkeby**
```
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024 --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr 0.0.0.0
```
![consola 1](images/consola1.png?raw=true "consola 1")

**Local**
```
geth --rpc --networkid 1999 --rpcaddr 127.0.0.1 --rpcport 8545 --rpc --rpcapi "web3,eth,personal,miner,net,txpool" --rpccorsdomain "*" --datadir acc1
```
![consola 1 Local](images/consola1-local.png?raw=true "consola 1 Local")


### Ingreso a la consola

Inicio de una consola de geth para desbloquear la cuenta e iniciar la minería

**Rinkeby**
```
geth -datadir=$HOME/.ethereum/rinkeby attach ipc:$HOME/.ethereum/rinkeby/geth.ipc console
personal.unlockAccount(eth.coinbase)
miner.start()
```
![consola 2](images/consola2.png?raw=true "consola 2") 

**Local**
```
geth attach ipc:\\.\pipe\geth.ipc
personal.unlockAccount(eth.coinbase)
miner.start()
```
![consola 2 local](images/consola2-local.png?raw=true "consola 2 local") 



### Carga de ethers

Se cargaron ethers en la cuenta de Rinkeby, para tener saldo al desplegar los contratos. En la red local, se usó el de la minería.

La carga de ethers, se realizó a través de la URL de faucet para rinkeby: [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/).

![faucets rinkeby](images/address-ethers.png?raw=true "faucets rinkeby")

Se pueden ver las transacciones con los ethers cargados en [etherscan](https://rinkeby.etherscan.io/address/0x7b51bfdd0fc002981eaf6529726adba44482d0f9).

![evidencia ethers](images/account-faucet-ethers.png?raw=true "evidencia ethers")

### Despliegue del contrato con truffle

En una tercera consola, se ingresó los comandos de truffle para el despliegue del contrato en la red. 

**Rinkeby**
```
# “-f 2” means you run the migration of migrations/2_deploy_contracts.js only. You don’t run migrations/1_initial_migration.js. Omit if if you want to run all migrations.
truffle migrate -f 2 --network rinkeby
```

En la instalación de contratos en la red, se detectó un error (*Exceeds block gas limit*) por el valor del *gas* configurado en el archivo *truffle.js*. Para corregirlo, se ingresó en la consola de geth el siguiente comando:


```
eth.getBlock("latest").gasLimit
```
El valor obtenido, es el que se ingresó en el archivo *truffle.js*.
Con eso se pudo corregir el error.

*Nota: Para rinkeby se deja indicado el despliegue, aunque no se tiene el nodo completo sincronizado, por lo que no se ve todavía el saldo de ethers en la cuenta, fallando el despliegue del contrato, por falta de fondos. Eso ocasiona, que luego de desplegar la app en IPFS, al darle "adopt" dará el error (en la consola de google) de "Adoption has not been deployed to detected network (network/artifact mismatch)"*


**Local**
```
# “-f 2” means you run the migration of migrations/2_deploy_contracts.js only. You don’t run migrations/1_initial_migration.js. Omit if if you want to run all migrations.
truffle1 migrate -f 2 --network development
```

![despliegue contrato local](images/despliegue-contrato-local.png?raw=true "despliegue contrato local")


----


## IPFS

### Instalación de IPFS

Se indica la instalación de IPFS para windows y linux. La red local se tiene en una máquina con sistema operativo Windows y la red Rinkeby en una máquina con Linux.

**En Linux (para usar Rinkeby)**

Se ejecutaron los siguientes pasos (disponibles en el [link](https://docs.ipfs.io/introduction/install/) oficial de ipfs), para realizar la instalación:

* Se descargó ipfs-go para linux, del link: [https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz](https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz)

* Se ingresaron los comandos para descomprimir e instalar ipfs:
```
tar xvfz go-ipfs_v0.4.17_linux-amd64.tar.gz
cd go-ipfs
./install.sh
```

![IPFS versión](images/ipfs-version.png?raw=true "IPFS versión")

**En Windows (para usar local)**

Se siguieron los pasos indicados en la éste [link](https://gist.github.com/drwasho/ca224cbd4a21440f7cc1245e594398e4).

![IPFS Windows Install](images/ipfs-windows-install.png?raw=true "IPFS Windows Install")

### Inicio de IPFS

Se inicializó IPFS, con el siguiente comando:

```
ipfs init
```

Luego, se dió inicio al servicio (daemon) de IPFS (el cual crea un nodo de ipfs) ingresando el siguiente comando:

```
ipfs daemon
```

**Linux** 

![ipfs daemon](images/ipfs-daemon.png?raw=true "ipfs daemon")

**Windows**

![ipfs daemon](images/ipfs-daemon-windows.png?raw=true "ipfs daemon")



### Compartir contenido con otros nodos

Dejando el nodo de IPFS en ejecución, se abrió otra terminal, para comenzar a compartir contenido entre los nodos, con el siguiente comando:

```
ipfs swarm peers
```

![ipfs swarm peers](images/ipfs-swarm-peers.png?raw=true "ipfs swarm peers")


### Compartir nuestro proyecto (pet-shop)

Se comenzó a compartir, con el siguiente comando de ipfs:

```
ipfs add -r dist/
```
**Linux** 

El hash obtenido (el último) de ipfs, es el siguiente: *Qmcjh4egibTVBsbNi5hbgK6YC5MaUrM5x9SFDJAjNjfxoN*

![ipfs Add](images/ipfs-add.png?raw=true "ipfs add")

**Windows** 

El hash obtenido (el último) de ipfs, es el siguiente: *Qma2byhtrFGbLgMyqnJ5uRHs9NZws42prYdX1eaMpGrNwx*


![ipfs Add Windows](images/ipfs-add-windows.png?raw=true "ipfs addWindows")


Con eso, nuestro contenido quedo incorporado en la red de ipfs. 

### Publicar el proyecto en ipfs

Para publicar el proyecto en ipfs, se ingresó el siguiente comando:

```
# Linux:
ipfs name publish Qmcjh4egibTVBsbNi5hbgK6YC5MaUrM5x9SFDJAjNjfxoN

# Windows:
ipfs name publish Qma2byhtrFGbLgMyqnJ5uRHs9NZws42prYdX1eaMpGrNwx
```

Luego de ejecutado el comando, se obtuvo lo siguiente:

**Linux**

![ipfs publish](images/ipfs-publish.png?raw=true "ipfs publish")

**Windows**

![ipfs publish Windows](images/ipfs-publish-windows.png?raw=true "ipfs publish Windows")

Eso nos indica que nuestro contenido esta publicado. El mismo, puede ser visualizado, ingresando la siguiente url:

**Linux (remoto sobre Rinkeby)**

*[gateway.ipfs.io/ipns/Qma1JimxyaBPyWrbMztUVR84uXKGCEYUjFcxTbv2PVrBbb](https://gateway.ipfs.io/ipns/Qma1JimxyaBPyWrbMztUVR84uXKGCEYUjFcxTbv2PVrBbb/)*

![ipfs host result](images/ipfs-host-result.png?raw=true "ipfs host result")

**Windows (local)**

*[http://127.0.0.1:8080/ipns/QmXwdaPPTHoNLpVXNbY8hN3H7QRcLRspQgbcd8gfuMiMc8/](http://127.0.0.1:8080/ipns/QmXwdaPPTHoNLpVXNbY8hN3H7QRcLRspQgbcd8gfuMiMc8/)*

![ipfs host result](images/ipfs-host-result-local.png?raw=true "ipfs host result")


-------

## Comentarios finales

Alternativamente a una red local o sincronizar Rinkeby, se investigó para sacar una cuenta en [infura.io](https://infura.io/) (infraestructura de ethereum en la nube) y configurar el provider para que tome la red rinkeby ahí. Se evaluará su uso para la PEC3.

```
# Configuración que habría que hacer para el provider en infura
const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/API_KEY'
```

