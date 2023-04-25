/** @type {import('next').NextConfig} */
module.exports = {
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
}
