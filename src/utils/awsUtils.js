import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAXWHDLSHV7AVRNDGP",
    secretAccessKey: "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",
  },
});

export const getImageFromS3 = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "elementalgames",
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
