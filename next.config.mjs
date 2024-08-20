/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.githubusercontent.com",   // Allow any subdomain
				port: "",
				pathname: "/**",    // Allow any path
			},
		],
	},
};

export default nextConfig;
