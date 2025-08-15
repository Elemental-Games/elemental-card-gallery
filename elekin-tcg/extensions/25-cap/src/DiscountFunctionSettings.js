// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Money} Money
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
function run(input) {
  const targets = input.cart.lines
    // Use the configured targets to filter the cart lines for the discount.
    .filter(line => line.merchandise.product.isEligible)
    .map(line => ({
      // Add the cart line ID to the discount targets.
      cartLine: {
        id: line.id
      }
    }));

  if (!targets.length) {
    // You can use STDERR for debug logs in your function.
    console.error("No eligible cart lines to apply discount to.");
    return EMPTY_DISCOUNT;
  }
  
  // The configured percentage discount value.
  const percentage = input.shop.discount.percentage;

  // The total cost of all eligible items.
  const totalEligibleCost = targets.reduce((total, target) => {
    const line = input.cart.lines.find(l => l.id === target.cartLine.id);
    if (line) {
      return total + parseFloat(line.cost.amount);
    }
    return total;
  }, 0);

  // Calculate the discount amount based on the percentage.
  let calculatedDiscount = totalEligibleCost * (percentage / 100);

  // Define the maximum discount amount.
  const maxDiscountAmount = 25.00;

  // If the calculated discount exceeds the maximum, cap it.
  const actualDiscountAmount = Math.min(calculatedDiscount, maxDiscountAmount);

  // Distribute the capped discount across all eligible lines.
  const discounts = targets.map(target => {
    const line = input.cart.lines.find(l => l.id === target.cartLine.id);
    if (!line) return null; // Should not happen

    const lineCost = parseFloat(line.cost.amount);
    const proportionOfTotal = lineCost / totalEligibleCost;
    const lineDiscount = actualDiscountAmount * proportionOfTotal;
    
    return {
      targets: [target],
      value: {
        amount: lineDiscount.toFixed(2)
      }
    };
  }).filter(Boolean); // Filter out any nulls

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
};


