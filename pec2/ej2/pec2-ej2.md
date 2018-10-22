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
