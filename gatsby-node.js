const fetch = require(`node-fetch`)
const path = require('path')
const slugify = require('slugify')

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

/************************************************************************
 *
 *  SPOTIFY API
 *
 */
exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
	const clientId = process.env.GATSBY_CLIENT_ID
	const clientSecret = process.env.GATSBY_CLIENT_SECRET

	// get data from GitHub API at build time
	// const result = await fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
	// const resultData = await result.json()

	const showId = '6C4MdNWQSPhmzBlIVau30e' // Hoy Trasnoche Spotify ID

	console.log('MODE ', process.env.NODE_ENV)
	console.log('ID ', clientId)
	console.log('SECRET ', clientSecret)

	const auth = Buffer.from(clientId + ':' + clientSecret).toString('base64')
	const conf = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + auth,
		},
		body: 'grant_type=client_credentials',
	}

	const result = await fetch('https://accounts.spotify.com/api/token', conf)
	const resultData = await result.json()
	const token = resultData.access_token

	console.log('TOKEN ', token)

	let nextPage = `https://api.spotify.com/v1/shows/${showId}/episodes?offset=0&limit=50&market=ES`
	let episodes = []

	while (nextPage) {
		let { next, items } = await fetchEpisodes(token, nextPage)
		nextPage = next
		episodes = [...episodes, ...items]
	}

	console.log('EP ', episodes.length)

	createNode({
		token,
		episodes: {
			weekly: episodes.filter(({ name }) => !/diario/i.test(name)),
			daily: episodes.filter(({ name }) => /diario/i.test(name)),
		},
		// required fields
		id: `spotify-api`,
		parent: null,
		children: [],
		internal: {
			type: `spotify`,
			contentDigest: createContentDigest(resultData),
		},
	})
}

const fetchEpisodes = async (token, nextPage) => {
	const conf = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}

	const result = await fetch(nextPage, conf)
	const resultData = await result.json()
	const items = await resultData.items.map(ep => ({
		id: ep.id,
		name: ep.name,
		slug: slugify(ep.name, { lower: true, remove: /[*+~.()'"¡!¿?:@#]/g }),
		description: ep.description,
		date: ep.release_date,
		urls: {
			desktop: ep.external_urls.spotify,
			app: ep.uri,
		},
	}))
	const next = await resultData.next

	return { next, items }
}

/************************************************************************
 *
 *  EPISODES PAGES
 *
 */
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const queryResults = await graphql(`
		query {
			spotify {
				episodes {
					weekly {
						id
						name
						slug
						description
						date(formatString: "dddd D [de] MMMM, YYYY", locale: "es")
						urls {
							app
							desktop
						}
					}
					daily {
						id
						name
						slug
						description
						date(formatString: "dddd D [de] MMMM, YYYY", locale: "es")
						urls {
							app
							desktop
						}
					}
				}
			}
		}
	`)
	const episodeTemplate = path.resolve(`src/templates/episode.js`)

	const { weekly, daily } = queryResults.data.spotify.episodes

	weekly.forEach((node, i, arr) => {
		createPage({
			path: `/episodio/${node.slug}`,
			component: episodeTemplate,
			context: {
				episode: {
					...node,
					numberEp: arr.length - i,
				},
			},
		})
	})

	daily.forEach((node, i, arr) => {
		createPage({
			path: `/episodio/${node.slug}`,
			component: episodeTemplate,
			context: {
				episode: {
					...node,
					numberEp: arr.length - i,
				},
			},
		})
	})
}
