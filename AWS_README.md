# AWS S3 Setup for Elemental Masters

This guide will help you set up and use AWS S3 for storing your card data spreadsheet and images.

## 1. AWS S3 Bucket Setup

1. Log in to your AWS Management Console.
2. Navigate to S3 and create a new bucket.
3. Enable public access for the bucket (make sure to set appropriate permissions).
4. Create two folders in your bucket: `cards` and `data`.

## 2. Uploading Files

### Spreadsheet
1. Prepare your card data spreadsheet with the following columns:
   - id
   - name
   - element
   - type
   - rarity
   - description
   - strength
   - agility
   - ability
   - specialAbility
   - essenceCost
   - essenceGeneration
   - background
   - synergies (JSON string)
   - counters (JSON string)
   - news (JSON string)
2. Save the spreadsheet as an Excel file (.xlsx).
3. Upload the spreadsheet to the `data` folder in your S3 bucket.

### Card Images
1. Prepare your card images as PNG files.
2. Name each image file exactly as the card's name in the spreadsheet, replacing spaces with hyphens and using lowercase. For example, "Fire Elemental" should be named "fire-elemental.png".
3. Upload all image files to the `cards` folder in your S3 bucket.

## 3. AWS IAM Setup

1. Go to IAM in the AWS Management Console.
2. Create a new IAM user with programmatic access.
3. Attach the `AmazonS3ReadOnlyAccess` policy to this user.
4. Save the Access Key ID and Secret Access Key securely.

## 4. Environment Variables

Set up the following environment variables in your project:

- VITE_AWS_REGION: Your AWS region (e.g., us-east-1)
- VITE_AWS_ACCESS_KEY_ID: Your IAM user's Access Key ID
- VITE_AWS_SECRET_ACCESS_KEY: Your IAM user's Secret Access Key
- VITE_S3_BUCKET_NAME: Your S3 bucket name
- VITE_S3_BUCKET_URL: The URL of your S3 bucket (e.g., https://your-bucket-name.s3.amazonaws.com)

## 5. Code Integration

The `src/utils/awsUtils.js` file has been updated to fetch data from your S3 bucket. Make sure the spreadsheet path in the `fetchCardsFromS3` function matches your actual file path in the S3 bucket.

If you need to make any changes or encounter issues, refer to the code comments in `src/utils/awsUtils.js` for guidance.