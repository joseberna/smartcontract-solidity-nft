require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const projectId = process.env.INFURA_PROJECT_ID
const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY
const apiKeyEtherScan = process.env.API_KEY_ETHER_SCAN

module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli:{
      url: `https://goerli.infura.io/v3/${projectId}`,
      accounts:[privateKey]
    },
  },
  etherscan: {
    apiKey: apiKeyEtherScan
  }
};
