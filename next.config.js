/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/logout',
        destination: '/',
        permanent: true,
      }
    ]
  },
}
