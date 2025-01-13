// PayPal Sandbox Test Accounts
const SANDBOX_ACCOUNTS = {
  BUSINESS: {
    email: 'sb-business@business.example.com', // Replace with your sandbox business email
    password: 'your_sandbox_password'
  },
  PERSONAL: {
    email: 'sb-personal@personal.example.com', // Replace with your sandbox personal email
    password: 'your_sandbox_password'
  }
};

// Test amounts
const TEST_AMOUNTS = [5, 10, 25];

// Test scenarios to verify
const TEST_SCENARIOS = [
  'Successful donation',
  'Anonymous donation',
  'Donation with updates subscription',
  'Custom amount donation'
]; 