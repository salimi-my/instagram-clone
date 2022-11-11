/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'firebasestorage.googleapis.com',
      'cloudflare-ipfs.com',
      'lh3.googleusercontent.com'
    ]
  }
};
