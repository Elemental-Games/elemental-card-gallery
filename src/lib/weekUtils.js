export const getCurrentWeekNumber = () => {
  // Start date of your campaign
  const startDate = new Date('2024-01-01'); // Adjust this date
  const currentDate = new Date();
  
  // Calculate the difference in weeks
  const diffTime = Math.abs(currentDate - startDate);
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  
  return diffWeeks;
}; 