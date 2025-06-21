const s3 = require("../config/s3.config");
const { v4: uuidv4 } = require("uuid");

// Upload function
const uploadFileToS3 = async (fileBuffer, fileName, mimeType) => {
  const key = `${uuidv4()}-${fileName}`; 

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, 
    Key: key, 
    Body: fileBuffer, 
    ContentType: mimeType, 
  };

  const uploadResult = await s3.upload(params).promise(); 
  return uploadResult.Location;
};

module.exports = uploadFileToS3;
