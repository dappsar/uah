pragma solidity ^0.4.24;

import "./Car.sol";

contract CarFactory {
 
    mapping(address => address[]) cars;

    // Prevención de enviar etheres a la factory
    function () public {
        revert();
    }

    function getCars(address _user)
        public
        view
        returns(address[])
    {
        return cars[_user];
    }

    function f1(address _owner)
        payable
        public
        returns(address car)
    {
        // Crear nuevo auto
        car = new Car(msg.sender, _owner);

        // Se agrega a la colección del sender
        cars[msg.sender].push(car);

        // Se puede emitir un evento de creación
        emit Created(car, msg.sender, _owner);
    }

    event Created(address car, address from, address to);
}