import { ethers } from "hardhat";
import { createTypedData } from "../utils/permit";
import { formatEther, parseEther, splitSignature } from "ethers/lib/utils";

async function main() {
  const signer = (await ethers.getSigners())[0];

  // ** deploy
  const tokenC = await (await ethers.getContractFactory("TestToken")).deploy();
  await tokenC.deployed();
  const vaultC = await (await ethers.getContractFactory("Vault")).deploy(tokenC.address);
  await vaultC.deployed();

  // ** sign
  const value = parseEther("1").toString();
  const nonce = await tokenC.nonces(signer.address);
  const chainId = (await signer.provider?.getNetwork())?.chainId;
  const name = await tokenC.name(); // 토큰 name
  const typedData = await createTypedData(
    Number(chainId),
    name,
    tokenC.address,
    signer.address,
    vaultC.address,
    value,
    undefined,
    nonce.toNumber()
  );
  const { EIP712Domain: _unused, ...types } = typedData.types;
  const { message } = typedData;
  const rawSignature = await signer._signTypedData(typedData.domain, types, typedData.message);

  // ** deposit with permit
  const { r, s, v } = splitSignature(rawSignature);
  const tx = await vaultC
    .connect(signer)
    .depositTokenPermit(message.value, message.deadline, v, r, s);
  await tx.wait();

  const balance = await vaultC.balanceOfToken(signer.address);
  console.log("result: ", balance.eq(value));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
