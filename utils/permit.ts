const MAX_INT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const createTypedData = async (
  chainId: number,
  name: string,
  tokenCa: string,
  owner: string,
  spender: string,
  value: string | number = MAX_INT,
  deadline?: number,
  nonce?: number
) => {
  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Permit",
    domain: {
      chainId,
      name,
      version: "1",
      verifyingContract: tokenCa,
    },
    message: {
      owner,
      spender,
      value,
      nonce,
      deadline: deadline || MAX_INT,
    },
  };
  return typedData;
};

export interface RSV {
  r: string;
  s: string;
  v: number;
}

export const splitSignatureToRSV = (signature: string): RSV => {
  signature.slice(0, 2);
  const r = "0x" + signature.slice(0, 64);
  const s = "0x" + signature.slice(64, 128);
  const v = parseInt(signature.slice(128, 130), 16);
  return { r, s, v };
};
