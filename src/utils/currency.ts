
/**
 * Format a number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format a number as Indian Rupees without the symbol
 * @param amount - The amount to format
 * @returns Formatted string without the ₹ symbol
 */
export const formatINRValue = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount);
};
