export const formatAmount = (amount) => {
  return Number(amount).toFixed(2);
};

export const validatePayPalTransaction = (order) => {
  if (order.status !== 'COMPLETED') {
    throw new Error('Payment not completed');
  }
  
  const amount = order.purchase_units[0].amount.value;
  if (!amount || Number(amount) < 1) {
    throw new Error('Invalid amount');
  }
  
  return true;
};

export const extractPayPalMetadata = (order) => {
  try {
    return JSON.parse(order.purchase_units[0].custom_id || '{}');
  } catch {
    return {};
  }
}; 