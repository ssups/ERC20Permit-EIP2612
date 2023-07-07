import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("TestToken");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
