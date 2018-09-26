# PEC 1 - Ejercicio 1

## Instalación de Ethereum

``` 
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
``` 

## Creación de cuenta de Ethereum

``` 
mkdir -p ~/ethereum/acc1
cd ethereum/acc1
geth account new --datadir acc1
# ingresar clave y repetición de clave
``` 

![Resultado de creación de la cuenta](images/creacion-cuenta.png?raw=true "Resultado de creación de la cuenta")


## Creación de archivo genesis

Se crea el archivo ~/ethereum/genesis.json, con el siguiente contenido:

``` 
{
   "config": {
       "chainId": 1999,
       "homesteadBlock": 0,
       "eip155Block": 0,
       "eip158Block": 0
   },
   "difficulty": "0x400",
   "gasLimit": "0x2100000",
   "alloc": {
       "759ccbe60c57f49afc2ad8018f56e35cb3f03bfc":
        { "balance": "0x1" }    
   }
}

# La dirección de la cuenta, es la correspondiente a la creada como acc1
``` 

![Archivo genesis creado](images/archivo-genesis.png?raw=true "Archivo genesis creado")

## Creacion blockchain

``` 
cd ~/ethereum/
geth -datadir acc1 init genesis.json
``` 

![Inicio blockchain](images/inicio-blockchain.png?raw=true "Inicio blockchain")

## Inicio de blockchain

``` 
geth --rpc --networkid 1999 --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi "web3,eth" --rpccorsdomain "*" --datadir acc1
``` 
![Inicio geth](images/geth-inicio.png?raw=true "Inicio geth")


## Inicio de consola de geth 
``` 
cd ~/ethereum/
geth attach --datadir acc1 ipc:acc1/geth.ipc
``` 

![Inicio geth console](images/inicio-consola.png?raw=true "Inicio geth console")

## Creación de nueva cuenta
``` 
personal.newAccount()
``` 

![Creación de nueva cuenta](images/creacion-nueva-cuenta.png?raw=true "Creación de nueva cuenta")




## Inicio minería

``` 
miner.start()
``` 

![Inicio minería](images/inicio-mineria.png?raw=true "Inicio minería")

## Ver el balance de la cuenta

``` 
# Diferentes opciones:
eth.getBalance("759ccbe60c57f49afc2ad8018f56e35cb3f03bfc")
eth.getBalance(eth.coinbase)
eth.getBalance(eth.accounts[0])
web3.fromWei(eth.getBalance(eth.coinbase), "ether")
``` 

![Balance cuenta](images/balance-cuenta.png?raw=true "Balance cuenta")


## Transferir monto entre cuentas

``` 
# Desbloqueo de la cuenta
personal.unlockAccount(eth.accounts[0])
eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value: web3.toWei(0.5, "ether")})
``` 

![Transferir monto entre cuentas](images/transferir.png?raw=true "Transferir monto entre cuentas")

