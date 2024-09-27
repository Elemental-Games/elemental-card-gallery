# Elemental Masters - Trading Card Game

## Local Setup

1. Install prerequisites:
   - Git: https://git-scm.com/downloads
   - Node.js: https://nodejs.org/en/download/

2. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-name]
   ```

3. Install dependencies:
   If you encounter issues with the package lock file, try the following:
   ```
   # Remove the existing package-lock.json file
   rm package-lock.json

   # Install dependencies without using the package lock
   npm install --no-package-lock
   ```
   If you still encounter issues, you can try forcing a clean install:
   ```
   npm ci
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory of your project and add the following variables:
   ```
   VITE_AWS_REGION=your_aws_region
   VITE_AWS_ACCESS_KEY_ID=your_access_key_id
   VITE_AWS_SECRET_ACCESS_KEY=your_secret_access_key
   VITE_S3_BUCKET_NAME=your_s3_bucket_name
   VITE_S3_BUCKET_URL=https://your-bucket-name.s3.amazonaws.com
   ```
   Replace the values with your actual AWS credentials and S3 bucket information.

5. Update AWS configuration:
   Open the file `src/utils/awsUtils.js` and ensure the following lines are using the environment variables:
   ```javascript
   const s3Client = new S3Client({
     region: import.meta.env.VITE_AWS_REGION,
     credentials: {
       accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
       secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
     },
   });
   ```

6. Start the development server:
   ```
   npm run dev
   ```

7. Open your browser and visit `http://localhost:5173`

## Deploying to BlueHost

[... rest of the existing content ...]

## AWS S3 Integration

For detailed instructions on setting up AWS S3 for storing card data and images, please refer to the `AWS_README.md` file in this repository.

## Troubleshooting

[... rest of the existing content ...]