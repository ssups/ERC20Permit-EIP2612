// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract TestToken is ERC20, ERC20Permit{
    constructor() ERC20("TestToken", "TT") ERC20Permit("TestToken") {
        _mint(msg.sender, 10_000 ether);
    }
}