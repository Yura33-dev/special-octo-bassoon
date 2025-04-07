import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proground-bucket.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
