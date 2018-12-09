# PEC3

## Introducción

Se realizó una aplicación para permitir la votación del mejor cantante latino.
La aplicación requiere generar una **firma** del voto, para luego realizar y persistir la votación en una blockchain.

El contrato hace uso de la librería **[open-zeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity)** (Ownable, Pausable, SafeMath, ERCRecovery) y de otros contratos, como [ERC165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md) y [Destructible](https://openzeppelin.org/api/docs/lifecycle_Destructible.html).

La interfaz web se realizó con [bootstrap](https://getbootstrap.com/), HTML y JavaScript; partiendo de los fuentes que genera [Truffle](https://truffleframework.com/). También se usa [nodeJs](https://nodejs.org/es/) y [npm](https://www.npmjs.com/).

A continuación se describe:

- [Funcionamiento teórico de la aplicación](https://github.com/dappsar/uah/tree/feature/pec3/pec3#funcionamiento-te%C3%B3rico-de-la-aplicaci%C3%B3n)
- [Preparación del ambiente](https://github.com/dappsar/uah/tree/feature/pec3/pec3#preparaci%C3%B3n-del-ambiente)
- [Cómo ejecutar el proyecto](https://github.com/dappsar/uah/tree/feature/pec3/pec3#ejecuci%C3%B3n-del-proyecto)
- [Detalle de la realización de cada punto solicitado por la cátedra](https://github.com/dappsar/uah/tree/feature/pec3/pec3#puntos-de-evaluaci%C3%B3n) (según planilla [PEC3_UAH](https://docs.google.com/spreadsheets/d/1BcmBRhOka2uD_Oeb5sO0pO01g1VsxCyMQ3evKX6Z3QE/edit#gid=0))
- [Mejoras para realizar](https://github.com/dappsar/uah/tree/feature/pec3/pec3#mejoras-para-realizar)
- [Referencias a link visitados para cada punto](https://github.com/dappsar/uah/tree/feature/pec3/pec3#referencia-a-links-visitados-para-el-desarrollo-de-la-pec)

---

## Funcionamiento teórico de la aplicación

La aplicación tiene 4 secciones:

* **Sección 1**: Grilla que muestra un listado de candidatos, sus votos, un filtro para buscar candidatos e información de la cantidad de candidatos que se están visualizando. También permite ordenar la grilla en forma ascendente o descendente.

- **Sección 2**: Una consola de información de los eventos que van sucediendo en la aplicación.

* **Sección 3**: Aquí se genera la "Firma" del voto. Se hace uso del método [eth_signTypedData](eth_signTypedData) de web3. Para generar la firma, es requerido seleccionar un candidato de una lista desplegable. Se usa también la cuenta y red configurada en Metamask (es necesario que la red configurada sea la misma en donde se desplegaron los contratos). Presionando el botón "Firmar", se abrirá una ventana de Metamask, con un mensaje que formará parte de la transacción, con la leyenda "Votar a _NombreCandidato_". Se está capturando la cancelación de la ventana de Metamask, por lo que si se decide cancelar la firma, aparecerá el mensaje (en la sección de información) _"El usuario decidió cancelar la firma en Metamask"_. El control del "Firmante" y de la "Firma", tiene una flecha a su derecha, que permite trasladar el dato respectivo (dirección del firmante y firma) a los controles de la sección 4 (Votar y persistir en blockchain), para evitarle al usuario, tener que ingresar los datos con copy/paste. Finalizada la generación de la firma, también se deja seleccionado el mismo candidato elegido, en la sección 4, en la lista desplegable.

- **Sección 4**: Aquí se realiza la votación propiamente dicha, usando la firma generada en la votación anterior. Se tiene que seleccionar el mismo candidato, dirección y una firma generada. Solo se puede realizar un voto por cuenta/votante.

Todas las secciones tienen un botón naranja con un signo de interrogación. Al presionarlo, se desplegará un panel, con una descripción que tiene como objetivo ayudar al usuario con la funcionalidad de la sección. Si se vuelve a presionar el botón, el panel se ocultará.

![Secciones de la aplicación](images/secciones.png?raw=true "Secciones de la aplicación")

![Firma](images/sign-metamask.png?raw=true "Firma")


![Video ejemplo de funcionamiento de la app](https://github.com/dappsar/uah/blob/feature/pec3/pec3/images/funcionamiento-app.gif)


## Preparación del ambiente

### Requisitos

En el ambiente es requerido, tener instalado:

- [Git](https://nodejs.org/en/)
- [nodeJs](https://nodejs.org/en/)
- [Ganache](https://truffleframework.com/ganache)
- [Truffle](https://truffleframework.com/)
- [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es)

### Inicialización del proyecto de Ethereum

Se partió del proyecto base de truffle [webpack](https://truffleframework.com/tutorials/bundling-with-webpack), lo que permitió contar con la estructura básica de carpetas y esqueleto de archivos. Para ello, se ejecutó el siguiente comando:

```
truffle unbox webpack
```

Con el proyecto de base instalado, se completo el contrato, en el archivo _contracts/Election.sol_ y se incorporó el mismo en _migrations/2_deploy_contracts.js_, para permitir la migración del contrato.

A medida que se fueron sumando los otros contratos: [Destructible.sol](contracts/Destructible.sol) y [ECDSA.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/ECDSA.sol), también se sumaron en _migrations/2_deploy_contracts.js_

Se hace uso de la librería [OpenZeppelin](https://openzeppelin.org/), la cual se instaló con [Ethereum Package Management](https://www.ethpm.com/registry/packages/25), con el siguiente comando:

```
truffle install zeppelin
```

Ese comando, genera una carpeta _[installed_contracts](installed_contracts)_ en donde pone los contratos que se instalan con EPM, en nuestro caso, Zeppelin.

![Installed Contracts](images/installed-contracts.png?raw=true "Installed Contracts")

Alternativamente, se puede instalar [OpenZeppelin](https://openzeppelin.org/), siguiendo las instrucciones de su web, con npm. Con ello, la aplicación andaría bien, pero fallaría al tratar de desplegarla con EPM, dada la falta de la carpeta _installed_contracts_ y la librería Zeppelin dentro de ella.

### Inicialización del proyecto web

Para instalar las dependencias que se usan para la aplicación (detalladas en el archivo _package.json_), basta con ejecutar el siguiente comando:

```
npm install
```

Eso generará la carpeta _node_modules_ con todas las dependencias requeridas.

---

## Ejecución del proyecto

### PASO 1: Clonación

Descargar el proyecto con git

```
git clone https://github.com/dappsar/uah.git
```

### PASO 2: Instalar dependencias

Ingresar en la carpeta _PEC3_.

Instalar las dependencias del proyecto con:

```
npm install
```

### PASO 3: Iniciar Ganache

Iniciar el cliente ganache que se haya descargado.

### PASO 4: Compilar, testear, publicar y desplegar el contrato inteligente

#### Compilación del contrato

Para realizar la compilación del contrato, se tiene que ejecutar el siguiente comando:

```
truffle compile
```

#### Migración del contrato a una blockchain

Teniendo los contratos compilados e iniciado _Ganache_, se pueden migrar a la blockchain con el siguiente comando:

```
truffle migrate --reset
```

Si se desea desplegar en otra red, diferente a la local, se tiene que usar el parámetro _network_ y tener configurada la red en el archivo _truffle.js_.

```
# Depliegue en Rinkeby
truffle migrate --reset --network rinkeby

# Despliegue en Ropsten
truffle migrate --reset --network ropsten
```

El contrato fue desplegado en Ropsten, usando infura (configurada en truffle.js).


![Infura Deploy](images/infuraDeploy.png?raw=true "Infura Deploy")

Dirección del contrato en ropsten:
[0x2aced47a02441ee562537ac1d274c3ddbcfe8f3a](https://ropsten.etherscan.io/address/0x22ee62aa0a8fbd5c403205a6da89c3baed435529)



#### Publicación del contrato en Registry de EPM

En caso de querer desplegar la aplicación con [Ethereum Package Management](https://www.ethpm.com/registry/packages/25), se puede realizare con el siguiente comando:

```
truffle publish
```

Se usará la configuración del archivo [ethpm.json](ethpm.json).

Y el contrato se puede buscar luego, en la registry de [ethpm](https://www.ethpm.com/registry):
https://www.ethpm.com/registry/packages/62

![Registry ethpm](images/ethpm.png?raw=true "Registry ethpm")

#### Testing del contrato

Se pueden correr los tests realizados para el contrato, con el comando:

```
truffle test
```

#### Distribución del proyecto

Se puede generar una carpeta con todos los archivos requeridos del proyecto, en caso de que se quiera distribuir (por ejemplo, para desplegar en un webServer. En mi máquina local, he usado tomcat, para lo cual hay un script deploy-tomcat.sh). Para ello, basta con ejecutar:

```
npm run build
```

Esa línea ejecutará los comandos de [webpack](https://webpack.js.org/), configurados en el archivo [webpack.config.js](webpack.config.js).

#### Despliegue en IPFS

Teniendo [IPFS](https://docs.ipfs.io/introduction/install/) instalado, se puede desplegar el proyecto con el comando:

```
npm run ipfs
```



### PASO 5: Configurar metaMask

Teniendo metaMask instalado en el navegador, hay que:

- Desbloquearlo (si está protegido con una contraseña)
- Conectarse a la blockchain local de ganache (por defecto http://localhost:7545)
- Importar una cuenta de ganache que nos permitirá tener una cuenta local, con ethers cargados

### Paso 6: Iniciar la interfaz Web

Se puede iniciar la interfaz web con el siguiente comando:

```
npm run dev
```

Luego, ir a la url: http://localhost:8080

(Nota: Si el puerto 8080 está en uso en la máquina, el comando de npm usado, automáticamente desplegará e indicará en la consola, el siguiente puerto libre para la url)

---

---

## Puntos de Evaluación

Se comenta lo realizado para cada punto solicitado por la cátedra.

### Tareas

#### Ejecución de la aplicación en un servidor local (localhost)

Se puede ejecutar la aplicación de forma local, con el ingreso de los siguientes comandos:

```
# Iniciar la blockchain local Ganache
./ganache-1.2.2-x86_64.AppImage

# Compilación e instalación de contratos en la blockchain (Ganache)
truffle migrate --reset

# Iniciar el proyecto web
npm run dev

# Visualización de la interfaz en un navegador, yendo a la direccion http://127.0.0.1:8080.
```


![Localhost web](images/localhost-web.png?raw=true "Localhost web")


![Truffle migrate](images/truffle-migrate.png?raw=true "Truffle migrate")

#### Visitar desde el navegador la URL correspondiente y que se realice una carga correcta de la aplicación

Visualización de la interfaz en un navegador, yendo a la direccion http://127.0.0.1:8080.

También se puede visualizar en IPFS en la siguiente [URL](https://gateway.ipfs.io/ipfs/QmZgLBT9yxqhyjhipNa1uaah3Yig5MZtEPzPeCedm95g2Q/index.html).


#### Interactuar con la aplicación (botones, formularios)

La aplicación tiene varias interacciones, que fueron descriptas en detalle (sección por sección), en éste readme, en la parte de **[Funcionamiento Teórico de la aplicación](https://github.com/dappsar/uah/tree/feature/pec3/pec3#funcionamiento-te%C3%B3rico-de-la-aplicaci%C3%B3n)**.


#### Mostrar el address actual (en función del proveedor: MetaMask)

Se puede visualizar la dirección configurada en Metamask, en la consola de mensajes (al iniciar la aplicación) y en el campo del _Firmante_.


![MetaMask Address](images/metamask-address.png?raw=true "MetaMask Address")

#### Refrescar automáticamente la web en caso de cambiar de address (MetaMask)

Al realizar cambio de red y/o de cuenta en Metamask, se actualizará el campo del firmante y se volverá a loguear un mensaje en la sección "Mensajes de la aplicación".

Esto se realizo con la siguiente línea de código:

```
web3.currentProvider.publicConfigStore.on('update', window.updateProvider);
```

Esa línea define una función de callback, llamada _updateProvider_, la cual es invocada al ejecutar el evento update del provider de web3, que esto sucede al cambiar la cuenta o red en metaMask.

Esa es la línea principal, luego se definió la función updateProvider, con el siguiente código, el cual actualiza la cuenta en la interfaz, en función de lo configurado en metaMask.

```javascript

window.updateProvider = function () {
  loadAccountData();
}

window.loadAccountData = function () {
  web3.eth.getCoinbase(function (err, account) {
    if (err === null) {
      document.getElementById('accountAddress').value = account;
    } else {
      trace("Error al cargar la cuenta del votante");
      $('#accountAddress').html(err);
    }
  });
}
```

#### Firmar transacciones usando MetaMask.

Se está realizando la firma de las transacciones con metamask. Es una de las funcionalidades de la aplicación. 


#### Guiar al usuario final que usa la aplicación sobre lo que está sucediendo en la aplicación. Ejemplos: Uso de eventos, actualizaciones de la interfaz

Se tiene una sección específica en la pantalla que muestra todos los eventos que van pasando. También se realiza la actualización de controles en la interfaz (cuenta del firmante con la que se cambia en metamask, actualización de lista desplegable para votar con el candidato seleccionado para la firma).

Hay botones específicos (naranjas con un signo de interrogación), que despliegan / ocultan un panel con información funcional para guiar al usuario en el uso de la aplicación.

---

### Interfaz

#### Implemente una libreria y utilícela en su aplicación. También es posible utilizar una librería existente de EthPM o de algún repositorio como OpenZeppelin

Se implementa OpenZeppelin, haciendo uso de la interface [Ownable](https://openzeppelin.org/api/docs/ownership_Ownable.html). Dicha interfaz es compatible con el [ERC-173](https://eips.ethereum.org/EIPS/eip-173). Es una interfaz que tiene una implementación estándar, para obtener la dirección del owner del contrato y poder realizar la transferencia a otra dirección, en caso de que sea necesario. Para esto ùltimo, se puede usar la función [transferOwnership](https://openzeppelin.org/api/docs/ownership_Ownable.html#transferOwnership).

Como indica en el link del [EIP-173](https://eips.ethereum.org/EIPS/eip-173), implementando la interfaz [Ownable](https://openzeppelin.org/api/docs/ownership_Ownable.html) de OpenZeppelin, el contrato queda compatible con el [ERC-173](https://eips.ethereum.org/EIPS/eip-173), pero también indica que estos contratos deberían implementar el [ERC-165](https://eips.ethereum.org/EIPS/eip-165), por ello se implementa esa interfaz.

Se realiza también la implementación de los contratos:

* [Pausable](https://openzeppelin.org/api/docs/lifecycle_Pausable.html): Pausable es de OpenZeppelin. Se usa para darle funcionalidad de pausar el contrato.

- [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.1.0/contracts/math/SafeMath.sol): Se implementa éste contrato para brindar seguridad sobre las variables enteras y evitar ataques de overflow (más detalle en la parte de seguridad del readme).
 
* [ECDSA](https://openzeppelin.org/api/docs/cryptography_ECDSA.html): Esta es una librería, también de openZeppelin. Se usa en el contrato para recuperar la dirección del firmante del mensaje y hacer validaciones antes de permitir la votación.

- [Destructible](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.1.0/contracts/lifecycle/Destructible.sol): Este contrato también se obtuvo de OpenZeppelin, aunque como está en el TAG 1.1.0 y no en el último release, se decidió copiar el contrato y hacer una implementación propia. A la misma, se le agregó la función getOwner, para usar en los tests.


Se intentó instalar la librería OpenZeppelin, haciendo uso de [Ethereum Package Management](https://www.ethpm.com/registry/packages/25). Para ello, se probó con el comando:

```
truffle install zeppelin
```

Eso generó una carpeta _installed_contracts_ en la raíz del proyecto, con la librería dentro, aunque revisando el archivo _ethpm.json_, se observó que se trataba de la versión 1.3.0, cuando el último realese es la versión 2.0.0, que en nuestro caso era necesaria, dada la inclusión de los contratos de ERC165. Así pues, se trató de forzar la instalación de la versión [2.0.0](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.0.0-rc.4), con el comando:

```
truffle install zeppelin@2.0.0
```

Pero ello generó un mensaje de error, de que no se encontraba esa versión (puede ser que sea un "release candidate"):

![Install Zeppelin Error](images/install-zeppelin-error.png?raw=true "Install Zeppelin Error")

Finalmente, se decidió instalar con el comando de npm:

```
npm install --savedev openzeppelin-solidity
```

También, se hizo uso de [Ethereum Package Management](https://www.ethpm.com/registry/packages/25), para instalar nuestro contrato, en la blockchain de [infura](https://infura.io/). Para ello, se siguieron las [instrucciones](https://truffleframework.com/docs/truffle/getting-started/package-management-via-ethpm) del sitio de [Truffle](https://truffleframework.com/). Se puede ver en los fuentes del proyecto, el archivo [ethpm.json](ethpm.json) con la información requerida para el despliegue del paquete y el uso de la red de infura en el archivo [truffle.js](truffle.js).

En la siguiente imagen, se muestra la publicación del contrato con EPM y la posterior instalación.

![Publish with EPM](images/publish-epm.png?raw=true "Publish with EPM")

---

### Librería

#### Uso de algún mecanismo como Herencia o Factory Contracts

Se utilizan los siguientes mecanismos:

- **Contract Self Destruction**: Para permitir hacer un "turn-off" o destrucción (sucide) del contrato. Esto se implementa con el contrato [_Destructible_](contracts/destructible.sol), que tiene las dos siguientes funciones como principales:

```javascript
function destroy() public onlyOwner {
  selfdestruct(owner());
}

function destroyAndSend(address _recipient) public onlyOwner {
  selfdestruct(_recipient);
}
```

- **Herencia**:

```javascript
// En el contrato Destructible que hereda del contrato Ownable
contract Destructible is Ownable {
...
}
```

```javascript
// En el contrato Election que hereda del contrato Pausable, Destructible y ERC165
contract Election is Pausable, Destructible, ERC165 {
...
}
```

- **Factory Contracts**: No se está utilizando, pero se dejó un ejemplo en una simple implementación de un contrato llamado [Cars](factorySample/Car.sol) y su contrato para manejar la factoría [CarFactory](factorySample/Car.sol).

#### Implementar una parada de emergencia en el contrato (Circuit Breaker / Emergency Stop)

Se realizó una implementación de _Circuit Breaker_ o _parada de emergencia_, haciendo uso de:

- Una variable flag, llamada: _stopped_
- Una funcion que permite activar / desactivar funciones, variando el valor de la variable flag. Dicha función sólo puede ser activada por el owner del contraro, gracias a la implementación del modificador _onlyOwner_, de la librería _openZeppelin_ (contrato _Ownable_).
- Dos modificadores: _stopInEmergency_ y _onlyInEmergency_, que permiten ejecutar o bloquear funciones, acorde al valor de la variable flag.

Se dejó con el modificador _stopInEmergency_, a la función _votar_, evitando que se ejecute en caso de algún error y luego de la llamada respectiva a la función _toggleContractActive_, por el dueño del contrato.

Se copia debajo el código de la función _toggleContractActive_ y de los modificadores creados.

```javascript
/**
  * @dev Cambiar un flag (stopped) en caso de algun error que requiera la
  * @dev implementación de detención de código (circuit-breaker)
  * @dev Hace uso del modificador 'onlyOwner' de la interfaz @Ownable
  */
function toggleContractActive() onlyOwner public
{
  stopped = !stopped;
}

/**
  * @dev Implementación de modificador para detener la ejecución de una función
  * @dev en caso de emergencia
  */
modifier stopInEmergency { if (!stopped) _; }

/**
  * @dev Implementación de modificador para ejecución de una función solo en caso
  * @dev de emergencia
  * @dev por el momento, modificador no utiliza den alguna función
  */
modifier onlyInEmergency { if (stopped) _; }
```

La implementación del código para _circuit-breaker_, fue basada en lo explicado en la sección [Circuit Breakers (Pause contract functionality)](https://github.com/ethereum/wiki/wiki/Safety#circuit-breakers-pause-contract-functionality) de la [wiki de Ethereum](https://github.com/ethereum/wiki/wiki/).

#### Comentar y justificar las medidas adoptadas en los contratos en cuanto a seguridad para evitar ataques típicos.

* Se implementa Ownable de openZeppelin (a través de Destructible) que permite establecer una única dirección con privilegios de administración, lo cual garantiza que las funciones con un modificador de "onlyOwner", puedan solo ser llamadas por el owner del contrato, aumentando la seguridad. 

- Se implementa un circuit breaker, mediante un modificador "stopInEmergency" y una función "toggleContractActive" para detener la ejecución del contrato en caso de algún error. La función "toggleContractActive" tiene el modificador "onlyOwner" por lo que únicamente el owner del contrato puede realizar un stop del mismo. 

* La función principal del contrato "vote", tiene varias validaciones:
	- La dirección de quien vota, tiene que ser la misma que se usó para firmar el mensaje de votación.
	- Se valida que el hash del candidato por el cual se quiere votar, sea igual al hash guardado en el contrato.
	- Se valida que la cuenta de la firma generada, sea igual a la cuenta del que desea votar.

##### Analizando algunas de las vulnerabilidades conocidas

* **Reentrancy and Race Conditions**: Una vulnerabilidad que ocurre al llamar a una función varias veces, antes de que termine la ejecución previa, lo que lleva a un comportamiento inesperado en el contrato. Esto se puede dar en caso de llamadas externas ([reentrancy-on-a-single-function](https://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy-on-a-single-function)) o compartir estado entre diferentes funciones ([cross-function-reentrancy](https://consensys.github.io/smart-contract-best-practices/known_attacks/#cross-function-reentrancy)). El contrato "Election" no tienen ninguno de esos casos, por lo que éste ataque no podría suceder. 

- **Integer Overflow and Underflow**: Un ataque por desbordamiento de una variable entera, por asignar un valor más allá de su límite. 
Por ejemplo, un uint8, donde su rango posible va de 0 (00000000 en binario)  a 28-1 (11111111 en binario o 255 en decimal).  Si se intenta sumar 1 a su valor máximo, 255, el resultado sería 256 en decimal (100000000 en binario), que es igual a 00000001 + 11111111, pero al tener tan solo 8 bits para representar ese valor, se descarta el primer 1 y queda como 0 (00000000 en binario). Es decir, 255+1=0. Obviamente es no es el resultado que esperábamos. El contrato tiene solo una variable entera (_votosRecibidos: uint8), la cual es incrementada en 1 en la función de votación y dicha función puede ser llamada una sola vez por votante / cuenta. De todas maneras, se utiliza [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.1.0/contracts/math/SafeMath.sol) de _openZeppelin_ que provee operadores seguros que lanzan una excepción en caso de desbordamiento, evitando que el contrato llegue a un estado no deseado.

* **DOS Attach**: Un ataque por denegación de servicio, que se puede dar por un _revert_ inesperado ([DoS with (Unexpected) revert](https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert)) o por límite de gas por bloque ([DoS with Block Gas Limit](DoS with Block Gas Limit)). El ataque por límite de gas, podría darse en el manejo de un array de tamaño desconocido, que en el caso de éste contrato, los arrays tienen un límite conocido. 

- **Insufficient gas griefing**: Un ataque que se puede dar en un contrato que acepta datos genéricos, pero no es el caso del contrato Election. 

#### Comente y justifique los posibles patrones de actualización que usaría en el contrato (no es necesario realizar la implementación).

##### Estrategia 1: Actualización usando el patrón _Proxy_

Una de los patrones utilizados para poder tener distintas versiones de un contrato, que lograría la "actualización"/"upgrade" del contrato, es el patrón **Proxy**.

Una de las implementaciones de ese patrón, fue creada por el equipo de [Zeppelin Solutions](https://zeppelin.solutions/) y el de [Aragon](https://wiki.aragon.org/archive/documentation/aragonOS_201/#2-upgradeability). El objetivo de ese patrón es tener un contrato (el proxy) que realiza una llamada a la versión del contrato que querramos que esté activa. Esa llamada, se puede realizar gracias a la función _delegatecall_, que fue implementada en Ethereum en el año 2015. Más información de esa función, puede ser obtenida en su implementación [EIP7](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7.md).

El siguiente código, es un ejemplo del patrón Proxy, con el uso de la función [delegatecall](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7.md).

```javascript
pragma solidity ^0.4.21;

/**
 * @title Proxy
 * @dev Gives the possibility to delegate any call to a foreign implementation.
 */
contract Proxy {

  address public implementation;

  function upgradeTo(address _address) public {
    implementation = _address;
  }

  /**
  * @dev Fallback function allowing to perform a delegatecall to the given implementation.
  * This function will return whatever the implementation call returns
  */
  function () payable public {
    address _impl = implementation;
    require(_impl != address(0));

    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize)
      let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
      let size := returndatasize
      returndatacopy(ptr, 0, size)

      switch result
        case 0 { revert(ptr, size) }
        default { return(ptr, size) }
    }
  }
}
```

El proxy se puede utilizar de la siguiente manera:

- Se despliega el contrato proxy.sol
- Se despliega nuestro contrato principal
- Se apunta el contrato proxy a la dirección desplegada del contrato principal, haciendo uso de la función _upgradeTo_.
- Se realiza la llamada a la función deseada, pero a través del contrato Proxy. Dado que la función no existe en ese contrato, se generará una _fallback function_, disparando un _delegatecall_ a la dirección del contrato principal que persiste en la variable _implementation_.
- El proxy cargará el código de la función llamada (esto es gracias a la funcionalidad provista por _delegatecall_) y la ejecutará.
- Al querer implementar una nueva versión del contrato principal, se crea un nuevo contrato, que herede del primero (así heredera el storage), se despliega y se llama a la función _upgradeTo_ del contrato _proxy_ con la nueva dirección del contrato principal.
- Finalmente, se llama a la función deseada, a través del contrato proxy.

El contrato _proxy_ es el que dispara todos los eventos y el que mantiene el estado.

Se puede ver una implementación simple, en el siguiente [repositorio de github](https://github.com/salanfe/ethereum_contract_upgradeablitiy_simple_example).

##### Estrategia 2: Separación de la lógica y los datos

Otra estrategia para permitir la actualización de contratos, es separar la lógica de los datos, en un contrato cada uno. El contrato que contiene la lógica actualiza los datos usando _setters_ implementados en el contrato de datos. Esta separación, permite reemplazar el contrato con la lógica y manteniendo los datos en el mismo lugar. El reemplazao se puede realizar con ENS.

(_Estrategía sugerida en el siguiente [link](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c)_)

#### Comente los smart contract como se describe en [la documentación de Solidity](https://solidity.readthedocs.io/en/v0.4.25/layout-of-source-files.html#comments).

Se agregaron comentarios como describe el link de ejemplo, haciendo uso del estilo [Doxygen](https://en.wikipedia.org/wiki/Doxygen).

---

### Smart Contracts

#### Justifique los test creados y explique para cada uno la función que realizan.

Para cubrir los test, se utilzan [chai](https://www.chaijs.com/) (una 'asertion library' para nodeJs) y [mocha](https://mochajs.org/) (un framework para test de aplicaciones de javascript).

Los tests principales son:

- Test para validar la inicialización del contrato 'Election' con 5 candidatos.
- Test para validar los datos del contrato: candidatos con 0 votos al inicio, hash de los candidatos.
- Test de realización válida de votación. 
- Test de error al intentar votar dos veces con la misma cuenta (la aplicación no lo permite).
- Test de intento de votación con contrato Pausado.
- Test de intento de votación con contrato con el modificador aplicado _stopInEmergency()_.

Los tests secundarios son:

Se decidió realizar tests sobre alguno de los contratos de openZepellin, para adquirir mayor experiencia en la implementación y ejecución de tests. Para ello, se copio el [código de github del contrato de test Destructible](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.1.0/test/Destructible.js). Test realizados: 

- Test para envío de los fondos al owner, luego de destruir el contrato.
- Test de envío de los fondos a otra cuenta, luego de destruir el contrato.

**Importante**: Se notó que al correr los tests, también se realiza consumo de ethers en las cuentas, por lo que se recomienda realizar un restart de genache antes de iniciar los tests, que vuelve a poner en las 10 cuentas de ejemplo, el valor de 100 ethers (el default de ganache).

#### Todos los test se ejecutan satisfactoriamente.

Los test se encuentran en el archivo _test/election.js_ y _test/destructible.js_ y se pueden ejecutar con el comando:

```
truffle test
```
En la siguiente imagen se puede verificar la ejecución correcta e todos los tests:

![Tests](images/tests.png?raw=true "Tests")

#### Realice comentarios sobre el código de los tests.

Se realizaron los comentarios sobre el código de los tests.

![Tests Comments](images/election-tests-comments.png?raw=true "Tests Comments")


---

### Extras

#### Alojar la aplicación en IPFS / Swarm

La aplicación se alojó en IPFS con el comando:

```
# start ipfs (ya estaba iniciado, en caso de que no: ipfs init)
env IPFS_LOGGING=info ipfs daemon

# Subir el directorio build
ipfs add -r ./build/ 
```

Se puede visualizar en el siguiente link:
[https://ipfs.io/ipfs/QmZgLBT9yxqhyjhipNa1uaah3Yig5MZtEPzPeCedm95g2Q/](https://gateway.ipfs.io/ipfs/QmZgLBT9yxqhyjhipNa1uaah3Yig5MZtEPzPeCedm95g2Q/index.html)
o
[https://gateway.ipfs.io/ipfs/QmZgLBT9yxqhyjhipNa1uaah3Yig5MZtEPzPeCedm95g2Q/]
(https://gateway.ipfs.io/ipfs/QmZgLBT9yxqhyjhipNa1uaah3Yig5MZtEPzPeCedm95g2Q/index.html)


Los contratos quedaron desplegados en *Ropsten*, por lo que configurando Metamask en esa red y yendo a la url de IPFS, se podrá ver la aplicación e interactuar con ella en esa red.

Dirección del contrato en Ropsten:
https://ropsten.etherscan.io/address/0x22ee62aa0a8fbd5c403205a6da89c3baed435529

En la solapa de [transacciones](https://ropsten.etherscan.io/address/0x22ee62aa0a8fbd5c403205a6da89c3baed435529), se puede ver evidencia del uso del contrato en esa red.

####  Utilizar ENS

_(No implementado)_

####  Uso de oráculos

_(No implementado)_


---
---


## Mejoras para realizar

Se comentan las mejoras que se pueden realizar al proyecto:

### Cambiar el destino de donde se almacenan los hash

Se están guardando los hashes de los candidatos en el contrato, lo que consume Ethers. Como mejora, se podría persitir en IPFS y leerlos desde allí.

### Mejorar el uso de MetaMask para cuentas en "privacy mode"

Warning que se está generando ahora:

```
inpage.js:1 ATTENTION: In an effort to improve user privacy, MetaMask stopped exposing user accounts to dapps if "privacy mode" is enabled on November 2nd, 2018. Dapps should now call provider.enable() in order to view and use accounts. Please see https://bit.ly/2QQHXvF for complete information and up-to-date example code.
```

### Cambiar uso experimental de eth_signTypedData

Se está haciendo uso de la versión experimental de eth_signTypedData, lo que genera un warning en la ejecución, avisando que la función será discontinuada en la próxima versión de MetaMask.

```
inpage.js:1 MetaMask: This experimental version of eth_signTypedData will be deprecated in the next release in favor of the standard as defined in EIP-712. See https://git.io/fNzPl for more information on the new standard.

```

---

### Referencia a Links visitados para el desarrollo de la PEC

#### Para EPM

- [Sitio oficial de EthPM](https://www.ethpm.com/registry)
- [Guía en sitio de Truffle: Package Management Via EthPM](https://truffleframework.com/docs/truffle/getting-started/package-management-via-ethpm)
- [Artículo en Medium: EthPM Smart Contract Packages for developers](https://medium.com/coinmonks/ethpm-smart-contract-packages-for-developers-81c77481c491)

#### Para despliegue en Infura

- [Sitio prinicipal de infura.io](https://infura.io)
- [Artículo en Medium: Rpc Access To Ethereum With Infura](https://medium.com/coinmonks/rpc-access-to-ethereum-with-infura-318854b7732f)
- [Artículo en Medium: Deploy Your Smart Contract Directly From Truffle With Infura](https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2)

#### Para la actualización de contratos

- [The Easy Way To Upgrade Smart Contracts](https://medium.com/bitclave/the-easy-way-to-upgrade-smart-contracts-ba30ba012784)
- [Blog Zeppelinos.org: Proxy-Patterns](https://blog.zeppelinos.org/proxy-patterns/)
- [Blog Zeppelinos.org: Proxy Libraries In Solidity](https://blog.zeppelin.solutions/proxy-libraries-in-solidity-79fbe4b970fd)
- [Blog Indorse.io: Ethereum Upgradeable Smart Contract Strategies](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c)
- [Artículo en Medium: Flexible Upgradability For Smart Contracts](https://medium.com/level-k/flexible-upgradability-for-smart-contracts-9778d80d1638)
- [Wiki de aragon.org: Upgradeability](https://wiki.aragon.org/archive/documentation/aragonOS_201/#2-upgradeability)
- [@Thomas Wiesner: Upgrade Smart Contracts on Chain](https://vomtom.at/upgrade-smart-contracts-on-chain/)

#### Para el uso de mecanismos como Herencia o factory contract

- [Artículo en Medium: Solidity Smart Contracts Design Patterns](https://medium.com/@i6mi6/solidty-smart-contracts-design-patterns-ecfa3b1e9784)
- [Solidity Inheritance and Deploying an Ethereum Smart Contract](https://coursetro.com/posts/code/103/Solidity-Inheritance-and-Deploying-an-Ethereum-Smart-Contract)

#### Para las medidas de seguridad adoptadas

- [Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/known_attacks/)
- [Artículo en Medium: Common Attacks In Solidity And How To Defend Against Them](https://medium.com/coinmonks/common-attacks-in-solidity-and-how-to-defend-against-them-9bc3994c7c18)
- [We Need Some Best Practices For Smart Contracts](https://vessenes.com/we-need-some-best-practices-for-smart-contracts/)
- [Smart Contract Attacks [Part 1] - 3 Attacks We Should All Learn From The DAO](https://hackernoon.com/smart-contract-attacks-part-1-3-attacks-we-should-all-learn-from-the-dao-909ae4483f0a)
- [Smart Contract Attacks [Part 2] - Ponzi Games Gone Wrong](https://hackernoon.com/smart-contract-attacks-part-1-3-attacks-we-should-all-learn-from-the-dao-909ae4483f0a)
- [Consensys Smart Contract Best Practices: Known Attacks](https://consensys.github.io/smart-contract-best-practices/known_attacks/)

#### Para la implementación de circuit-breaker

- [Wiki Ethereum: Safety Circuit Breakers Pause Contract Functionality](https://github.com/ethereum/wiki/wiki/Safety#circuit-breakers-pause-contract-functionality)

#### Para comentar el contrato

- [Solidity Docs: Layout Of Source Files](https://solidity.readthedocs.io/en/v0.4.25/layout-of-source-files.html#comments)

#### Para la implementación del OpenZeppelin

- [Sitio Oficial de Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/issues/840)
- [Blog Zeppelin Solutions: A Gentle Introduction To Ethereum Programming](https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2)

#### Firma de transacciones

- [Repositorio en Github: danfinlay/js-eth-personal-sign-examples](https://github.com/danfinlay/js-eth-personal-sign-examples)
- [Artículo en Medium: Ethereum Signing And Validating](https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3)
- [Use ECRecovery Lib from Zeppelin in Solidity](https://medium.com/@augustolemble/use-ecrecovery-lib-from-zeppelin-in-solidity-2b5cec9198f4)

#### Conversión de video a gif animado

- [https://ezgif.com/](https://ezgif.com/)