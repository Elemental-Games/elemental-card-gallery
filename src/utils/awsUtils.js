import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "YOUR_AWS_REGION",
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  },
});

export const getImageFromS3 = async (bucketName, key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    const arrayBuffer = await response.Body.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    return null;
  }
};