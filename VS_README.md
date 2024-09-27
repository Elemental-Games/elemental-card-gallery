# Visual Studio Code Setup for Elemental Masters

This guide will help you set up the Elemental Masters project in Visual Studio Code, create your .env file, and deploy the code from Git.

## Setting Up the Project

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-name]
   ```

2. Open the project in Visual Studio Code:
   ```
   code .
   ```

3. Install the recommended extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

## Creating the .env File

1. In the root directory of your project, create a new file named `.env`:
   ```
   touch .env
   ```

2. Open the `.env` file and add your AWS credentials and other environment variables:
   ```
   VITE_AWS_REGION=your_aws_region
   VITE_AWS_ACCESS_KEY_ID=your_access_key_id
   VITE_AWS_SECRET_ACCESS_KEY=your_secret_access_key
   VITE_S3_BUCKET_NAME=your_s3_bucket_name
   VITE_S3_BUCKET_URL=https://your-bucket-name.s3.amazonaws.com
   ```

3. Save the file.

## Installing Dependencies

1. Open the integrated terminal in VS Code (View > Terminal).

2. Remove the existing package-lock.json file:
   ```
   rm package-lock.json
   ```

3. Install dependencies without using the package lock:
   ```
   npm install --no-package-lock
   ```

## Running the Development Server

1. In the terminal, run:
   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173` to see the application.

## Deploying from Git

To deploy your code from Git, you can use various platforms like Netlify, Vercel, or GitHub Pages. Here's a general approach:

1. Commit your changes:
   ```
   git add .
   git commit -m "Your commit message"
   ```

2. Push to your repository:
   ```
   git push origin main
   ```

3. Set up continuous deployment on your chosen platform, linking it to your Git repository.

4. Configure your deployment settings to:
   - Use Node.js as the environment
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`

5. Add your environment variables from the `.env` file to your deployment platform's settings.

6. Trigger a deploy, and your site should be live!

Remember to never commit your `.env` file to version control. It's already included in the `.gitignore` file, but always double-check before pushing sensitive information.