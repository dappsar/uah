# PEC 1 - Ejercicio 3

## Instalación de compilador solc

Se realizó la instalación del compilador solc, siguiendo las instrucciones del siguiente [link](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html).

## Desarrollo del contrato

Se desarrollo un contrato muy simple, que emite un saludo. El mismo se puede ver debajo y en el archivo [contract.sol](contract.sol).

``` 
pragma solidity ^0.4.22;

contract Greeter {
    string greeting;
    address owner;

    modifier onlyOwner {
        require(isOwner(), "Only owner can do that!");
        _;
    }
    
    constructor(string _greeting) public {
        greeting = _greeting;
        owner = msg.sender;
    }

    function sayHello() public view returns(string) {
        if (isOwner()) {
            return "Hola UAH !!";
        } else {
            return greeting;
        }
    }

    function setGreeting(string _newGreeting) public onlyOwner {
        greeting = _newGreeting;
    }
    
    function isOwner() view private returns(bool) {
        return msg.sender == owner;    
    }
}
``` 

## Obtención de los códigos de operación

``` 
solc --optimize --opcodes contract.sol 
``` 

![Códigos de operación](images/solc-opcodes.png?raw=true "Códigos de operación")


## Obtención de los identificadores de las funciones

- Identificadores de las funciones que existan dentro del contrato inteligente.

``` 
solc --optimize --hashes contract.sol
``` 

![Identificadores de las funciones](images/solc-hashes.png?raw=true "Identificadores de las funciones")


## Estimación del gas utilizado por cada función 


``` 
solc --optimize --gas contract.sol 
``` 

![Gas estimado para cada función](images/solc-estimated-gas.png?raw=true "Gas estimado para cada función")

