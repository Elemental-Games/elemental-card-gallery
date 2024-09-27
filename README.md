# Welcome to your GPT Engineer project

## Project info

**URL**: https://run.gptengineer.app/projects/27e0842a-046d-4f4c-99b1-3945c1606811/improve

## How can I edit this code?

There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://gptengineer.app/projects/27e0842a-046d-4f4c-99b1-3945c1606811/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/27e0842a-046d-4f4c-99b1-3945c1606811/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)

## Creating an AWS IAM User and Access Key

To set up AWS credentials for this project, follow these steps:

1. Sign in to the AWS Management Console.
2. Navigate to the IAM (Identity and Access Management) dashboard.
3. In the left sidebar, click on "Users" and then click "Add user".
4. Enter a user name and select "Programmatic access" for the AWS access type.
5. Click "Next: Permissions" and attach the necessary policies (e.g., AmazonS3ReadOnlyAccess).
6. Continue through the next steps, reviewing the user details and permissions.
7. On the final page, you'll see the user's Access Key ID and Secret Access Key. 
   **Important:** This is the only time you'll be able to view the Secret Access Key, so make sure to save it securely.
8. Download the CSV file with the credentials or copy them to a secure location.
9. Use these credentials in your application's environment variables:
   - VITE_AWS_ACCESS_KEY_ID: Your Access Key ID
   - VITE_AWS_SECRET_ACCESS_KEY: Your Secret Access Key

Remember to keep these credentials secure and never commit them to version control.