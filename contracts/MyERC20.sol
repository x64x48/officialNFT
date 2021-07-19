// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(18));

    constructor(string memory name, string memory symbol) public ERC20(name, symbol) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
