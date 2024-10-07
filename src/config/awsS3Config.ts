import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const AWS_REGION = process.env.AWS_REGION!
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!



export const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadToS3 = async (file: Express.Multer.File, folder: string) => {

    const key = `${folder}/${Date.now()}-${file.originalname}`;

    const params = {
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const uploadResult = await s3Client.send(command);
    const fileUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
    return { uploadResult, fileUrl };
};

