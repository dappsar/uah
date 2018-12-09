pragma solidity ^0.4.24;

import "/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
  * @title Destructible
  *
  * @dev Base contract that can be destroyed by owner. All funds in contract will be sent to the owner.
  * @dev Credit: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.12.0/contracts/lifecycle/Destructible.sol
  *
  * Se hace un contrato propio, dado que la rama master de la última versión de fuentes de OpneZepplin, no tiene el contrato.
  * Por otro lado, se tuvo que cambiar en la función "destroy", el uso de Owner, para enviarlo como una función y no la variable.
  */
contract Destructible is Ownable {


  /**
    * @dev Constructor
    */
  constructor() public payable { }

  /**
    * @dev Transfers the current balance to the owner and terminates the contract.
    */
  function destroy() public onlyOwner {
    selfdestruct(owner());
  }

  /**
    * @dev Transfers the current balance to _recipients and terminates the contract.
    * @param _recipient Address where wants to tranfer
    */
  function destroyAndSend(address _recipient) public onlyOwner {
    selfdestruct(_recipient);
  }

  /**
    * @dev Get Owner
    */
  function getOwner() public onlyOwner view returns (address) {
    return owner();
  }
}