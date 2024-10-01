# Google Sign-In Setup Guide

This guide will walk you through the process of setting up Google Sign-In for your Elemental Masters application.

## Prerequisites

1. You must have a Google account.
2. Your project should be set up in Firebase.

## Steps

1. **Create a new project in the Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click on "Select a project" > "New Project"
   - Name your project and click "Create"

2. **Enable Google Sign-In API**
   - In the Google Cloud Console, go to "APIs & Services" > "Dashboard"
   - Click on "+ ENABLE APIS AND SERVICES"
   - Search for "Google Sign-In API" and enable it

3. **Create OAuth 2.0 Client ID**
   - In the Google Cloud Console, go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application" as the application type
   - Add your domain (and localhost for testing) to the "Authorized JavaScript origins"
   - Add your domain followed by `/auth/callback` (and localhost equivalent) to the "Authorized redirect URIs"
   - Click "Create"

4. **Set up Firebase**
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Add a new project or select your existing project
   - In the project settings, add a web app if you haven't already
   - Copy the Firebase configuration object

5. **Update environment variables**
   - In your project's `.env` file, add the following variables with your Firebase config:

     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

6. **Enable Google Sign-In in Firebase**
   - In the Firebase Console, go to "Authentication" > "Sign-in method"
   - Enable Google as a sign-in provider
   - Add your authorized domains

7. **Test your setup**
   - Run your application locally
   - Try signing in with Google
   - Verify that users can sign in successfully and their information is stored in Firebase

## Troubleshooting

- If you encounter CORS issues, make sure your domain is properly added to the authorized origins in both Google Cloud Console and Firebase.
- Check that all environment variables are correctly set and accessible in your application.
- Ensure that the Google Sign-In API is enabled and the OAuth 2.0 Client ID is properly configured.

For more detailed information, refer to the [Firebase Authentication documentation](https://firebase.google.com/docs/auth) and [Google Sign-In documentation](https://developers.google.com/identity/sign-in/web).