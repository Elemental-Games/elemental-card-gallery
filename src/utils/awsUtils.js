// This is a mock function to simulate fetching images from S3
export const getImageFromS3 = async (key) => {
  // In a real application, this would be an API call to your backend
  console.log(`Fetching image with key: ${key}`);
  
  // Simulating an API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return a placeholder image URL
  return `https://via.placeholder.com/300x400?text=${key}`;
};
