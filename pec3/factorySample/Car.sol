pragma solidity ^0.4.24;

contract Car {

    address public creator;
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor (
        address _creator,
        address _owner
    ) public {
        creator = _creator;
        owner = _owner;
    }

    // Mantiene todos los ethers enviados a la dirección del contrato
    function() payable public {
        emit Received(msg.sender, msg.value);
    }

    function carInfo() public view returns(address, address) {
        return (creator, owner);
    }

    event Received(address from, uint256 amount);
}
