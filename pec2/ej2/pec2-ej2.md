# PEC 2 - Ejercicio 2

## Modificación de un proyecto de Truffle

Se utilizó el proyecto [Pet-Shop](https://github.com/dappsar/uah/tree/master/pet-shop-tutorial), en el cual se realizaron varios cambios.

### Incorporación de mi nombre en la página del proyecto

Se modificó el archivo [index.html](https://github.com/dappsar/uah/blob/master/pet-shop-tutorial/src/index.html), para agregar mi nombre, según lo pedido en la PEC.

![Pet Shop](images/pet-shop-nombre.png?raw=true "Pet Shop")

### Cambios en el 'empaquetado' del proyecto

Se incorporó **webpack** al archivo package.json, para realizar la distribución de los archivos del proyecto. Los mismos quedan en la carpeta **dist/**. Para ello, se realizó lo siguiente:

* Se instaló webpack con el comando **npm i --save webpack**

* Se creó el archivo **webpack.config.js**, el cual contiene las instrucciones para armar los archivos de distribución del proyecto. Contenido del archivo:

```
const path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {main: path.join(__dirname, 'src/js', 'app.js')},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js'
	},
	/*
	We added a module key to our webpack config object assigning it an object with rules property, 
	which is an array of some rules for configuring the loaders we want to use with webpack
	*/
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: [
				path.resolve(__dirname, "src/")
			]
		}]
	}
}
```

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
        from: "0x94a9c4f8eb4e40e394d9800b69c42a18fee2af7b",
        gas: 6712390
    },
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
```
### Despliegue del contrato

Para poder utilizar la aplicación completa desde ipfs, es requerido tener el contrato desplegado en la red **rinkeby**. Para ello, hubo que cargar ethers a la cuenta y luego desbloquearla, para poder desplegar el contrato con truffle. 

La carga de ethers, se relaizó a través de la URL de faucet para rinkeby: [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/).

![faucets rinkeby](images/address-ethers.png?raw=true "faucets rinkeby")

Se pueden ver las transacciones con los ethers cargados en [etherscan](https://rinkeby.etherscan.io/address/0x94a9c4f8eb4e40e394d9800b69c42a18fee2af7b).

![evidencia ethers](images/account-faucet-ethers.png?raw=true "evidencia ethers")


Para desplegar el contrato, se manejaron 3 consolas:

* Consola 1: el nodo de la red rinkeby en ejecución

```
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024 --rpc --rpcapi "eth,net,web3" --rpccorsdomain '*' --rpcaddr 0.0.0.0
```

![consola 1](images/consola1.png?raw=true "consola 1")

* Consola 2: Un attach a la consola de geth para desbloquear la cuenta

```
geth -datadir=$HOME/ethereum/rinkeby attach ipc:$HOME/ethereum/rinkeby/geth.ipc console
```

![consola 2](images/consola2.png?raw=true "consola 2") 

* Consola 3: Ingreso de comandos de truffle para el despliegue del contrato en rinkeby.

```
# “-f 2” means you run the migration of migrations/2_deploy_contracts.js only. You don’t run migrations/1_initial_migration.js. Omit if if you want to run all migrations.
truffle migrate -f 2 --network rinkeby
```

![consola 3](images/consola3.png?raw=true "consola 3")


## Instalación de IPFS

Se ejecutaron los siguientes pasos (disponibles en éste [link](https://docs.ipfs.io/introduction/install/)), para realizar la instalación de IPFS:

* Se descargó ipfs-go para linux, del link: [https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz](https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz)

* Se ingresaron los comandos para descomprimir e instalar ipfs:
```
tar xvfz go-ipfs_v0.4.17_linux-amd64.tar.gz
cd go-ipfs
./install.sh
```

![IPFS versión](images/ipfs-version.png?raw=true "IPFS versión")


## Inicio de IPFS

Se inicializó IPFS, con el siguiente comando:

```
ipfs init
```


Luego, se dió inicio al servicio (daemon) de IPFS (el cual crea un nodo de ipfs) ingresando el siguiente comando:

```
ipfs daemon
```

![ipfs daemon](images/ipfs-daemon.png?raw=true "ipfs daemon")


## Compartir contenido con otros nodos

Dejando el nodo de IPFS en ejecución, se abrió otra terminal, para comenzar a compartir contenido entre los nodos, con el siguiente comando:

```
ipfs swarm peers
```

![ipfs swarm peers](images/ipfs-swarm-peers.png?raw=true "ipfs swarm peers")


## Compartir nuestro proyecto (pet-shop)

Se comenzó a compartir, con el siguiente comando de ipfs:

```
ipfs add -r dist/
```

![ipfs add](images/ipfs-add.png?raw=true "ipfs add")

El hash obtenido de ipfs, es el siguiente:
**QmdY7NPX1PAiy1e2c3aRLNTjnUgRUbifUJdoStcC3V1aih**

Con eso, nuestro contenido quedo incorporado en la red de ipfs. 

## Publicar el proyecto en ipfs

Para publicar el proyecto en ipfs, se ingresó el siguiente comando:

```
# Se utilizó el hash obtenido en el paso anterior
ipfs name publish QmdY7NPX1PAiy1e2c3aRLNTjnUgRUbifUJdoStcC3V1aih
```

Luego de ejecutado el comando, se obtuvo lo siguiente:

![ipfs publish](images/ipfs-publish.png?raw=true "ipfs publish")

Eso nos indica que nuestro contenido esta publicado. El mismo, puede ser visualizado, ingresando la siguiente url:

**gateway.ipfs.io/ipns/Qma1JimxyaBPyWrbMztUVR84uXKGCEYUjFcxTbv2PVrBbb**

![ipfs host result](images/ipfs-host-result.png?raw=true "ipfs host result")
