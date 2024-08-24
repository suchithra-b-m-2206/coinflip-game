// contracts/CoinFlip.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    event CoinFlipped(address indexed player, uint256 amount, bool won);

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool _guess) external payable {
        require(msg.value > 0, "Must send some ether to play");

        // Generate pseudo-random number (not secure, just for testnet purposes)
        bool result = (block.timestamp % 2 == 0);

        if (result == _guess) {
            // Win case: send back double the amount
            payable(msg.sender).transfer(msg.value * 2);
            emit CoinFlipped(msg.sender, msg.value, true);
        } else {
            // Lose case: ether stays in the contract
            emit CoinFlipped(msg.sender, msg.value, false);
        }
    }

    // Function to withdraw contract balance (only owner can withdraw)
    function withdrawBalance() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
