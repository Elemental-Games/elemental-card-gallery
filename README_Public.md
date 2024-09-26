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

4. Set up environment variables as described in the AWS_README.md file.

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and visit `http://localhost:5173`

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

## AWS S3 Integration

For detailed instructions on setting up AWS S3 for storing card data and images, please refer to the `AWS_README.md` file in this repository.

## Troubleshooting

If you encounter any issues with AWS S3 integration or image loading, please check the following:

1. Ensure all environment variables are correctly set as described in `AWS_README.md`.
2. Verify that your AWS IAM user has the correct permissions.
3. Check that your S3 bucket is properly configured for public access.
4. Confirm that your card images are named correctly and uploaded to the right folder in your S3 bucket.

For any other issues, please refer to the project documentation or contact the development team.