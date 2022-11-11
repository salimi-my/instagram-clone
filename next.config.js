/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'cloudflare-ipfs.com',
      'lh3.googleusercontent.com'
    ]
  }
};
