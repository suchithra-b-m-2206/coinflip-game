/** @type import('hardhat/config').HardhatUserConfig 
module.exports = {
  solidity: "0.8.24",
};
require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.24",
    networks: {
        rinkeby: {
            url: "https://mainnet.infura.io/v3/ef9e814c7bf3435a88ab707473484fdc", // Replace YOUR_INFURA_PROJECT_ID with your Infura project ID
            accounts: ["ef9e814c7bf3435a88ab707473484fdc"] // Replace 0xYOUR_PRIVATE_KEY with your wallet's private key
        }
    }
};*/

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://mainnet.infura.io/v3/ef9e814c7bf3435a88ab707473484fdc", // Replace with your Infura project ID
      accounts: ["0x0123456789012345678901234567890123456789012345678901234567890123"], // Dummy private key for testing purposes
    },
  },
};
