import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const uploadToS3Bucket = async (
  file: any,
  userId: number,
  folderName: string
) => {
  const {
    file: { filename, createReadStream },
  } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'nomadcoffeee',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();
  return Location;
};
