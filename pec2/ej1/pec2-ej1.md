# PEC 2 - Ejercicio 1 - ENS

Adquiera un dominio bajo el TLD ‘.test’ en la testnet que desee (Rinkeby o Ropsten).
Si no le es posible sincronizar un nodo, puede desplegar el servicio ENS en la red testrpc
con Geth.

## Sincronización de la red rinkeby

Primero hubo que sincronizar la red rinkeby, para lograr tener un nodo completo.

## Descarga de archivo complementarios

Luego, basándose en el tutorial [https://michalzalecki.com/register-test-domain-with-ens/](https://michalzalecki.com/register-test-domain-with-ens/), se descargó el archivo complementario [ensutils-rinkeby.js](https://gist.github.com/MichalZalecki/db02810da8e582d0494adb2c5fd31f3c#file-ensutils-rinkeby-js). Ese archivo tiene algunas funciones, requeridas para manejarnos con ENS. 

## Comandos de consola

Se deja el archivo del punto anterior, en el path en donde ingresamos a la consola. Luego, ingresamos el siguiente comando:

``` 
loadScript("./ensutils-rinkeby.js")
``` 

Con ello, queda cargado el script con las funciones requeridas para realizar la interacción con ENS.

## Disponibilidad del dominio

Se verifica la disponibilidad del dominio:

``` 
# Es necesario enviar el nombre con la conversión a sha3
testRegistrar.expiryTimes(web3.sha3("dbaranowski"))
``` 

Si retorna 0, es que el dominio está disponible. 

## Registración del dominio

Para registrar el dominio, hay que ingresar la consola de geth, así desbloqueamos la cuenta. 

``` 
personal.unlockAccount(eth.accounts[0])
``` 

Para registrar el dominio, se ingresa:

``` 
testRegistrar.register(web3.sha3('dbaranowski'), eth.accounts[0], {from: eth.accounts[0]})
``` 




--------------------------------------

Se descarga el archivo de https://raw.githubusercontent.com/ensdomains/ens/master/ensutils-testnet.js
	Before we start, let’s download ensutils-testnet.js which contains a few ABIs and helper functions that will make the process more straightforward. Hardcoded ENS address is no good for us since we would like to use Rinkeby, not Ropsten. On the other hand, if you try to register a name on Ropsten, you are all set. Head toward line 220 and change ENS contract address.
	https://github.com/ensdomains/ens/blob/master/ensutils.js
	


Once you did it, connect to running Ethereum node using geth and load the ensutils script.

IMPORTANTE: 

	web3.eth.defaultAccount = web3.eth.accounts[0]
	personal.unlockAccount(web3.eth.defaultAccount)

Instrucciones en:
http://docs.ens.domains/en/latest/quickstart.html
