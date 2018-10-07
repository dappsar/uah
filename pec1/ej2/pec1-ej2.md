# PEC 1 - Ejercicio 2

## Inicio de sincronización red Rinkeby

``` 
# Creación explícita de la carpeta
mkdir ~/.ethereum/rinkeby
cd ~/.ethereum/rinkeby

# Inicialización con bloque genesis
curl -O https://www.rinkeby.io/rinkeby.json
geth --datadir=. init rinkeby.json
``` 

![Inicialización de Rinkeby](images/init-rinkeby.png?raw=true "Inicialización de Rinkeby")

## Cargar la blockchain Rinkeby

``` 
Opcion 1:
geth --networkid=4 --datadir=.

Opcion 2 (nodo especifico):
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024
``` 

![Cargar la blockchain Rinkeby](images/load-blockchain-rinkeby.png?raw=true "Cargar la blockchain ")

## Iniciar la consola de Geth con la red Rinkeby

``` 
cd ~/.ethereum/rinkeby/
geth attach ipc:geth.ipc
``` 

![Inicir la consola de get con la red rinkeby](images/load-blockchain-rinkeby.png?raw=true "Inicir la consola de get con la red rinkeby")


## Revisar el estado de sincronización dentro de la consola

``` 
eth.syncing
``` 

![Revisar el estado de sincronización dentro de la consola](images/rinkeby-check-state-attached.png?raw=true "Revisar el estado de sincronización dentro de la consola")



## Revisar el estado de sincronización fuera de la consola
### Sin tiempo estimado

``` 
geth --exec 'var s = eth.syncing; console.log("\n------------ GETH SYNCING PROGRESS\nprogress: " + (s.currentBlock/s.highestBlock*100)+ " %\nblocks left to parse: "+ (s.highestBlock-s.currentBlock) + "\ncurrent Block: " + s.currentBlock + " of " + s.highestBlock)' attach ipc:geth.ipc
``` 

![Revisar el estado de sincronización fuera de la consola](images/rinkeby-check-state-deattached.png?raw=true "Revisar el estado de sincronización fuera de la consola")

### Con tiempo estimado (usando un script)

``` 
geth --exec "loadScript('GethSyncingProgress_2TimeEstimate.js')" attach ipc:geth.ipc
``` 

Nota: Es importante que el archivo [*GethSyncingProgress_2TimeEstimate.js*](GethSyncingProgress_2TimeEstimate.js), se encuentre en la ruta: *~/.ethereum/rinkeby/*

![Revisar el estado de sincronización fuera de la consola](images/rinkeby-check-status-with-time-estimated.png?raw=true "Revisar el estado de sincronización fuera de la consola")


## Obtener la dirección del bloque génesis


## Obtener sólo la cantidad de peers a los que está conectado

``` 
Opción 1: admin.peerCount
Opción 2: admin.peers.length
``` 

![Cantidad de peers a los que está conectado](images/rinkeby-peers-connected.png?raw=true "Cantidad de peers a los que está conectado")


## Obtener información acerca de los peers a los que está conectado y altura máxima

### Información acerca de los peers

``` 
Opción 1: admin.peers
``` 

![info peers](images/rinkeby-peers-info.png?raw=true "info peers")


``` 
Opción 2: admin.peers.forEach(function(value){console.log(value.network.remoteAddress+"\t"+value.name)})
``` 
![info peers](images/rinkeby-peers-info-2.png?raw=true "info peers")


### Altura máxima de bloque de los peers

``` 
``` 

