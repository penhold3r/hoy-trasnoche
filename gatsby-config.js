const globImporter = require('node-sass-glob-importer')

module.exports = {
	siteMetadata: {
		title: `Hoy Trasnoche`,
		description: `Hoy Trasnoche es el mas mejor y único podcast de cine del mundo punto podcast punto posta punto fm punto com`,
		author: `@penholder`,
		siteUrl: 'https://hoy-trasnoche.netlify.app/',
		keywords: 'podcast cine peliculas hoy trasnoche posta calori sargenti',
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				precision: 8,
				importer: globImporter(),
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Hoy Trasnoche`,
				short_name: `Hoy Trasnoche`,
				start_url: `/`,
				background_color: `#000000`,
				theme_color: `#e6017d`,
				display: `standalone`,
				icon: `src/images/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
	],
}
