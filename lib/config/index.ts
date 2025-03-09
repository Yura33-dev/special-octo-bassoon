export const config = {
  DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/graund',
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000',
  s3_bucket_name: process.env.S3_BUCKET_NAME || '',
  s3_region: process.env.S3_REGION || '',
  aws_access_key: process.env.AWS_ACCESS_KEY || '',
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY || '',
};
