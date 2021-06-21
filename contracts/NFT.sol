// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract erc20 {
    function transferFrom(address sender, address recipient, uint256 amount) public {}
    function transfer(address recipient, uint256 amount) public {}
}

contract NFT is ERC721 {
    address private _owner;
    erc20 public token;
    mapping (uint256 => uint256) private _tokenPrice;

    modifier onlyOwner() {
        require (msg.sender == _owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _owner = newOwner;
    }

    constructor(string memory name, string memory symbol, address addr) ERC721(name, symbol) public {
        _owner = msg.sender;
        token = erc20(addr);
    }

    function withdrew(address addr, uint256 amount) public onlyOwner() {
        token.transfer(addr, amount);
    }

    function setToken(address addr) public onlyOwner() {
        token = erc20(addr);
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return _tokenPrice[tokenId];
    }

    function mintUniqueTokenTo(uint256 tokenId, string memory name, string memory img, string memory coupon, string memory remark, uint256 price) public onlyOwner {
        super._mint(address(this), tokenId);
        super._setTokenURI(tokenId, string(abi.encodePacked('{"name":"', name, '","img":"', img, '","coupon":"', coupon, '","remark":"', remark, '"}')));
        _tokenPrice[tokenId] = price;
    }

    function mintUniqueTokenTo(uint256 tokenId, string memory tokenURI, uint256 price) public onlyOwner {
        super._mint(address(this), tokenId);
        super._setTokenURI(tokenId, tokenURI);
        _tokenPrice[tokenId] = price;
    }

    function buyNFT(address to, uint256 tokenId) public {
        token.transferFrom(to, address(this), getTokenPrice(tokenId));
        _transfer(address(this), to, tokenId);
    }
}
