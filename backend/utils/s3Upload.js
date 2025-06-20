const s3 = require("../config/s3.config");
const { v4: uuidv4 } = require("uuid");

// Upload function
const uploadFileToS3 = async (fileBuffer, fileName, mimeType) => {
  const key = `${uuidv4()}-${fileName}`; // Unique filename to avoid collisions

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Target bucket name
    Key: key, // Path and name of the file inside the bucket
    Body: fileBuffer, // Actual file data
    ContentType: mimeType, // Tells S3 the type of file
  };

  const uploadResult = await s3.upload(params).promise(); // Upload and wait for result
  return uploadResult.Location; // Return the file URL
};

module.exports = uploadFileToS3;
