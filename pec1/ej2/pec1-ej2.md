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
geth --networkid=4 --datadir=. --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --cache=1024
``` 

![Cargar la blockchain Rinkeby](images/load-blockchain-rinkeby.png?raw=true "Cargar la blockchain ")

## Iniciar la consola de Geth con la red Rinkeby

``` 
cd ~/.ethereum/rinkeby/
geth attach ipc:geth.ipc
``` 

![Inicir la consola de get con la red rinkeby](images/load-blockchain-rinkeby.png?raw=true "Inicir la consola de get con la red rinkeby")

