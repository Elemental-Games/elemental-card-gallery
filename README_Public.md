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
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Deploying to BlueHost

1. Build the project:
   ```
   npm run build
   ```

2. Upload the contents of the `dist` folder to the `public_html` directory on your BlueHost server using FTP or the file manager.

3. Ensure your domain points to the correct directory.

4. Create a `.htaccess` file in the `public_html` directory with the following content:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Using AWS S3 for Images

To use images from AWS S3, you need to update the `src/utils/awsUtils.js` file:

1. Replace `YOUR_AWS_REGION`, `YOUR_ACCESS_KEY_ID`, and `YOUR_SECRET_ACCESS_KEY` with your actual AWS credentials.

2. Update the `getImageUrl` function to use your S3 bucket URL:
   ```javascript
   const getImageUrl = (cardName) => {
     const formattedName = cardName.toLowerCase().replace(/\s+/g, '-');
     return `https://your-s3-bucket-name.s3.amazonaws.com/cards/${formattedName}.png`;
   };
   ```

3. Replace `YOUR_BUCKET_NAME` with your actual S3 bucket name in the `fetchCardsFromS3` function.

4. Ensure that your S3 bucket is configured for public access and has the appropriate CORS settings.

Remember to keep your AWS credentials secure and never commit them to version control. Consider using environment variables for sensitive information in a production environment.