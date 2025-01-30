import { TickMath } from "@uniswap/v3-sdk";

export async function calculateOutputAmount(
  sqrtPriceX96,
  priceLowPercentage,
  priceUpPercentage,
  amount1Isneeded,
  amount
) {
  const priceCurrent = (Number(sqrtPriceX96) / 2 ** 96) ** 2;
  console.log(priceCurrent);
  const lowerPrice = priceCurrent * priceLowPercentage; // 10% below
  const upperPrice = priceCurrent * priceUpPercentage; // 10% above
  const { tickLower, tickUpper } = calculateTicks(lowerPrice, upperPrice, 60);
  console.log(tickLower, tickUpper);

  // Convert prices to square root form
  const sa = Math.sqrt(lowerPrice);
  const sb = Math.sqrt(upperPrice);
  const sp = Math.sqrt(priceCurrent);

  if (amount1Isneeded) {
    const [amount1, liquidity] = getAmount1FromAmount0(amount, sa, sp, sb);
    return [amount1, liquidity, tickLower, tickUpper];
  } else {
    const [amount0, liquidity] = getAmount0FromAmount1(amount, sa, sp, sb);
    return [amount0, liquidity, tickLower, tickUpper];
  }
}

function getAmount1FromAmount0(amount0, sa, sp, sb) {
  let liquidity = getLiquidity0(amount0, sp, sb);
  liquidity = (liquidity * 95) / 100;
  const amount1 = calculateY(liquidity, sp, sa, sb);
  return [amount1, liquidity];
}

function getAmount0FromAmount1(amount1, sa, sp, sb) {
  let liquidity = getLiquidity1(amount1, sa, sp);
  liquidity = (liquidity * 95) / 100;
  const amount0 = calculateX(liquidity, sp, sa, sb);
  return [amount0, liquidity];
}

function calculateTicks(priceLower, priceUpper, tickSpacing) {
  // Calculate raw ticks
  let tickLower = Math.floor(Math.log(priceLower) / Math.log(1.0001));
  let tickUpper = Math.ceil(Math.log(priceUpper) / Math.log(1.0001));

  // Clamp ticks to valid ranges
  const MIN_TICK = TickMath.MIN_TICK;
  const MAX_TICK = TickMath.MAX_TICK;

  if (tickLower < MIN_TICK) tickLower = MIN_TICK;
  if (tickUpper > MAX_TICK) tickUpper = MAX_TICK;

  // Align with tick spacing
  tickLower = Math.floor(tickLower / tickSpacing) * tickSpacing;
  tickUpper = Math.ceil(tickUpper / tickSpacing) * tickSpacing;

  return { tickLower, tickUpper };
}

// Function to get liquidity_0
function getLiquidity0(x, sa, sb) {
  return (x * sa * sb) / (sb - sa);
}

// Function to get liquidity_1
function getLiquidity1(y, sa, sb) {
  return y / (sb - sa);
}

// Function to calculate x
function calculateX(L, sp, sa, sb) {
  sp = Math.max(Math.min(sp, sb), sa); // If the price is outside the range, use the range endpoints instead
  return (L * (sb - sp)) / (sp * sb);
}

// Function to calculate y
function calculateY(L, sp, sa, sb) {
  sp = Math.max(Math.min(sp, sb), sa); // If the price is outside the range, use the range endpoints instead
  return L * (sp - sa);
}
