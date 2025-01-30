import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "wagmi/actions";
import {
  factoryContractAddress,
  factoryContractAbi,
  pairContractAbi,
  tokenAbi,
  calculatorAddress,
  calculatorAbi,
} from "./utils/helperContract";
import { config } from "@/config";
import { ethers } from "ethers";

export async function getPairContract(zeroToken, oneToken, fee) {
  const result = await readContract(config, {
    address: factoryContractAddress,
    abi: factoryContractAbi,
    functionName: "getPool",
    args: [zeroToken, oneToken, fee],
  });

  return result;
}

export async function getSlot0(pairContractAddress) {
  const result = await readContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "slot0",
    args: [],
  });

  return result;
}

export async function getLiquidity(pairContractAddress) {
  const result = await readContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "liquidity",
    args: [],
  });

  return result;
}

export async function swap(pairContractAddress, recipient, zeroForOne, amount) {
  console.log(pairContractAddress, recipient, zeroForOne, amount);
  const sqrLimit = zeroForOne
    ? "4295128740"
    : "1461446703485210103287273052203988822378723970341";
  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "swap",
    args: [recipient, zeroForOne, amount, sqrLimit, ""],
  });

  await waitForTransactionReceipt(config, {
    hash: tx,
  });
}

export async function addLiquidity(
  pairContractAddress,
  recipient,
  amount,
  tickLower,
  tickUpper
) {
  console.log(pairContractAddress, recipient, amount, tickLower, tickUpper);
  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "mint",
    args: [recipient, tickLower, tickUpper, amount, ""],
  });

  await waitForTransactionReceipt(config, {
    hash: tx,
  });
}

export async function initialize(sqrtPriceX96, pairContractAddress) {
  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "initialize",
    args: [sqrtPriceX96],
  });

  await waitForTransactionReceipt(config, {
    hash: tx,
  });
}

export async function createPool(token0, token1, fee) {
  console.log(token0.toString());
  console.log(token1.toString());
  console.log(fee);

  const tx = await writeContract(config, {
    address: factoryContractAddress,
    abi: factoryContractAbi,
    functionName: "createPool",
    args: [token0, token1, fee],
  });

  const txr = await waitForTransactionReceipt(config, {
    hash: tx,
  });

  console.log(txr);

  return txr;
}

export async function approve(tokenAddress, pairContractAddress, amount) {
  console.log(amount);
  const decimals = await readContract(config, {
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "decimals",
    args: [],
  });

  const tx = await writeContract(config, {
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "approve",
    args: [
      pairContractAddress,
      ethers.utils.parseUnits(amount.toString(), decimals),
    ],
  });

  await waitForTransactionReceipt(config, {
    hash: tx,
  });
}
