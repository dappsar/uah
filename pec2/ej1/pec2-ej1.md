# PEC 2 - Ejercicio 1

## 

``` 
``` 


Se descarga el archivo de https://raw.githubusercontent.com/ensdomains/ens/master/ensutils-testnet.js
	Before we start, let’s download ensutils-testnet.js which contains a few ABIs and helper functions that will make the process more straightforward. Hardcoded ENS address is no good for us since we would like to use Rinkeby, not Ropsten. On the other hand, if you try to register a name on Ropsten, you are all set. Head toward line 220 and change ENS contract address.
	https://github.com/ensdomains/ens/blob/master/ensutils.js
	


Once you did it, connect to running Ethereum node using geth and load the ensutils script.

IMPORTANTE: 

	web3.eth.defaultAccount = web3.eth.accounts[0]
	personal.unlockAccount(web3.eth.defaultAccount)
