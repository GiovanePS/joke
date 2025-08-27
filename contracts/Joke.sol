// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Joking is ERC721, Ownable {
    uint8 private _nextId = 1;

    mapping(address => uint256) private _ownedTokenId;

    // TODO: Try another way to store jokes, outside of the contract code
    string[] private jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta!"
        "Why did the bicycle fall over? Because it was two-tired!",
        "What do you call cheese that isn't yours? Nacho cheese!",
        "Why did the math book look sad? Because it had too many problems.",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "What do you call a bear with no teeth? A gummy bear!",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ];

    constructor() ERC721("Tokenized Jokes", "JOKE") Ownable(msg.sender) {}

    function claimToken() external returns (uint256) {
        require(balanceOf(msg.sender) == 0, "already claimed");
        require(_nextId <= jokes.length, "sold out");
        uint8 tokenId = _nextId++;
        _mint(msg.sender, tokenId);
        _ownedTokenId[msg.sender] = tokenId;

        return tokenId;
    }

    function jokeOf(address owner) public view returns (string memory) {
        uint256 tokenId = _ownedTokenId[owner];
        require(tokenId != 0, "owner has no token");
        return jokes[tokenId - 1];
    }

    function myJoke() public view returns (string memory) {
        uint256 tokenId = _ownedTokenId[msg.sender];
        require(tokenId != 0, "you don't got no token");
        return jokes[tokenId - 1];
    }
}
