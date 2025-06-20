const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configuring AWS with our credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Required for authentication
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Required for authentication
  region: process.env.AWS_REGION, // Tells AWS which server region to use
});

const s3 = new AWS.S3(); // Create an instance of the S3 service

module.exports = s3;
