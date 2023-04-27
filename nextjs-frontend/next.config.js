/** @type {import('next').NextConfig} */
module.exports = {
	output: 'standalone',
	async redirects() {
		return [
			{
				source: '/',
				destination: '/genres',
				permanent: true,
			},
		]
	},
	reactStrictMode: true,
	env: {
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
	typescript: {
		ignoreBuildErrors: true
	},
	eslint: {
		ignoreDuringBuilds: true
	}
}
