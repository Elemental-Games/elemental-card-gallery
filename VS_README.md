# Visual Studio Code Setup for Elemental Masters

This guide will help you set up the Elemental Masters project in Visual Studio Code and deploy the code from Git.

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

## Installing Dependencies

1. Open the integrated terminal in VS Code (View > Terminal).

2. Install dependencies:
   ```
   npm install
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

5. Trigger a deploy, and your site should be live!

Remember to never commit sensitive information to version control.