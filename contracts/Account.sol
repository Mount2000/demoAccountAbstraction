pragma solidity 0.8.12;
import "@account-abstraction/contracts/core/EntryPoint.sol";

contract Account is IAccount {
    address public sender;
    uint public count;
    address public owner;

    constructor(address _owner){
        owner = _owner;
    }

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external returns (uint256 validationData){
        return 0;
    }

    function execute() external{
        sender = msg.sender;
        count++;
    }
}

contract AccountFactory {
    address public account;
    function createAccount(address owner) external returns(address){
        Account acc = new Account(owner);
        account = address(acc);
        return address(acc);
    } 
}