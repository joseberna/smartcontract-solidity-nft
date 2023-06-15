/** @format */

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
// const { ethers } = require('ethers');

async function main() {
  console.log("main");
  const [deployer] = await ethers.getSigners();

  console.log("Desplegando contrato NFTDegree en la cuenta:", deployer.address);
  console.log(
    "Balance de la cuenta:",
    (await deployer.getBalance()).toString()
  );
  try {
    const DegreeNFTSmartContract = await ethers.getContractFactory("NFTDegree");
    const _DegreeNftSC = await DegreeNFTSmartContract.deploy();
    saveFilesABI(_DegreeNftSC, "NFTDegree");
    console.log("Address Contrato:", _DegreeNftSC.address);

    console.log("**** DESPLEGADO CORRECTAMENTE ****");
  } catch (err) {
    console.error("main error: ", err);
  }
}

function saveFilesABI(contract, name) {
  console.log("saveFilesABI");
  try {
    const fs = require("fs");
    const contractsDir = __dirname + "/../contractsData";

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
    const contractArtifact = artifacts.readArtifactSync(name);
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  } catch (err) {
    console.error("main.saveFilesABI error: ", err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });