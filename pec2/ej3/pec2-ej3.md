
# PEC 2 - Ejercicio 3 - SWARM

Puede reutilizar parte de lo que ha realizado en el ejercicio 2 (hasta subir el proyecto a GitHub). Arranque un nodo de Swarm y aloje la DApp (Proyecto truffle pet-shop). Además, vincule el ENS adquirido con la DApp de tal forma que una url como la de a continuación muestre la aplicación. Por ejemplo: http://localhost:8500/bzz:/swarmtest.test/index.html

Debe ser capaz de utilizar la aplicación al igual que en localhost (por ejemplo: con
MetaMask). Adjunte el hash (manifest) de Swarm asociado con la aplicación.

## Instalación de SWARM

Se realiza la instalación de swarm, ejecutando los siguientes comandos:

``` 
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum-swarm
``` 

## Asociación con la cuenta local

Ahora, se asocia la cuenta local con swarm.

``` 
swarm --datadir=$HOME/.ethereum/rinkeby --bzzaccount 0x7b51bfdd0fc002981eaf6529726adba44482d0f9
``` 

![swarm sync](images/swarm-sync.png?raw=true "swarm sync")

