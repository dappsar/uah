# PEC 2 - Ejercicio 2

## Modificación de un proyecto de Truffle

Se utilizó el proyecto [Pet-Shop](https://github.com/dappsar/uah/tree/master/pet-shop-tutorial), en el cual se modificó el archivo [index.html](https://github.com/dappsar/uah/blob/master/pet-shop-tutorial/src/index.html), agregando mi nombre. 

![Pet Shop](images/pet-shop-nombre.png?raw=true "Pet Shop")


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

### Cambios previos al proyecto pet-shop 

Antes que subir el proyecto a ipfs, se realizan algunos cambios para poder distribuirlo:

* Se instaló webpack con el comando **npm i -g webpack**

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

### Compartir el proyecto en ipfs 

Luego de los cambios en el proyecto para su distribución, se comenzo a compartir, con el siguiente comando de ipfs:

```
ipfs add -r dist/
```

![ipfs add](images/ipfs-add.png?raw=true "ipfs add")


El hash obtenido de ipfs, es el siguiente:
**QmdY7NPX1PAiy1e2c3aRLNTjnUgRUbifUJdoStcC3V1aih**

Con eso, nuestro contenido quedo incorporado en la red de ipfs. 

### Publicar el proyecto en ipfs

Para publicar el proyecto en ipfs, hay que ingresar el siguiente comando:

```
# Se utiliza el hash obtenido el paso anterior
ipfs name publish QmQAMLkq4JJK7TxJHfx3MCoQ7aWfvKmqAVkP3D49gydBu2
```

Luego de ejecutado el comando, se obtiene lo siguiente:

![ipfs publish](images/ipfs-publish.png?raw=true "ipfs publish")

Eso nos indica que nuestro contenido esta publicado. El mismo, puede ser visualizado, ingresando la siguiente url:

**gateway.ipfs.io/ipns/Qma1JimxyaBPyWrbMztUVR84uXKGCEYUjFcxTbv2PVrBbb**


