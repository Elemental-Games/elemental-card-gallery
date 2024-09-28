import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: import.meta.env.VITE_AWS_OAUTH_DOMAIN,
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: import.meta.env.VITE_AWS_REDIRECT_SIGN_IN,
      redirectSignOut: import.meta.env.VITE_AWS_REDIRECT_SIGN_OUT,
      responseType: 'code'
    }
  },
  Storage: {
    region: import.meta.env.VITE_AWS_REGION,
    bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID
  }
});