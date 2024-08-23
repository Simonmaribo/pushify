/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://pushify.net',
	generateRobotsTxt: true, // (optional)
	// ...other options
}
