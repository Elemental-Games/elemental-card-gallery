# AWS S3 Setup Guide

This guide will walk you through the process of setting up AWS S3 for storing card data and images for your Elemental Masters application.

## Prerequisites

1. An AWS account
2. AWS CLI installed and configured on your local machine

## Steps

1. **Create an S3 bucket**
   - Go to the AWS S3 console
   - Click "Create bucket"
   - Choose a unique name for your bucket
   - Configure bucket settings (public access, versioning, etc.)

2. **Set up IAM user**
   - Go to the AWS IAM console
   - Create a new user with programmatic access
   - Attach the AmazonS3FullAccess policy to the user
   - Save the Access Key ID and Secret Access Key

3. **Update environment variables**
   - In your project's `.env` file, add the following variables:
     ```
     AWS_REGION=your_aws_region
     AWS_ACCESS_KEY_ID=your_access_key_id
     AWS_SECRET_ACCESS_KEY=your_secret_access_key
     S3_BUCKET_NAME=your_s3_bucket_name
     S3_BUCKET_URL=https://your-bucket-name.s3.amazonaws.com
     ```

4. **Upload card data and images**
   - Use the AWS CLI or S3 console to upload your card data (Excel file) and card images to the bucket

5. **Configure CORS (if necessary)**
   - In the S3 console, go to your bucket's permissions
   - Add a CORS configuration to allow requests from your application's domain

## Troubleshooting

- Ensure your IAM user has the correct permissions
- Double-check that your environment variables are correctly set
- Verify that your S3 bucket name and region are correct

For more detailed information, refer to the [AWS S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).