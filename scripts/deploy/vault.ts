import { ethers } from "hardhat";

const TOKEN_CA = "";

async function main() {
  const factory = await ethers.getContractFactory("Vault");
  const contract = await factory.deploy(TOKEN_CA);
  await contract.deployed();
  console.log;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
