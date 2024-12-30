export const config = {
  DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/graund',
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000',
};
