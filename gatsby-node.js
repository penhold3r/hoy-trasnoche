const fetch = require(`node-fetch`)
const Promise = require('promise')
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

	const showId = '6C4MdNWQSPhmzBlIVau30e' // Hoy Trasnoche Spotify ID

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

	let nextPage = `https://api.spotify.com/v1/shows/${showId}/episodes?offset=0&limit=50&market=ES`
	let episodes = []
	let weekly, daily

	while (nextPage) {
		let { next, items } = await fetchEpisodes(token, nextPage)
		nextPage = next
		episodes = [...episodes, ...items]
	}

	//-------------------------------------------------------------------------------
	// Weekly episodes nodes

	weekly = episodes.filter(({ name }) => !/diario/i.test(name))

	createNode({
		episodes: [...weekly],
		// required fields
		id: `spotify-api`,
		parent: null,
		children: [],
		internal: {
			type: `spotify`,
			contentDigest: createContentDigest(resultData),
		},
	})

	//-------------------------------------------------------------------------------
	// Daily episodes nodes

	daily = episodes.filter(({ name }) => /diario/i.test(name))
	daily = daily.map(async episode => {
		// two movies
		if (episode.name.includes('+')) {
			const { 1: movies } = episode.name.split(':')
			const moviesList = movies.split('+')

			const movie1 = await fetchMovie(encodeURIComponent(moviesList[0].replace(' ', '+')))
			const movie2 = await fetchMovie(encodeURIComponent(moviesList[1].replace(' ', '+')))

			return { ...episode, movie: null, movies: [movie1, movie2] }
		} else {
			const { 1: movieTitle } = episode.name.split(':')
			const movie = await fetchMovie(encodeURIComponent(movieTitle.replace(' ', '+')))

			return { ...episode, movie, movies: null }
		}
	})

	await Promise.all(daily).then(episodes => {
		createNode({
			episodes,
			// required fields
			id: `spotify-daily`,
			parent: null,
			children: [],
			internal: {
				type: `daily`,
				contentDigest: createContentDigest(daily),
			},
		})
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

const fetchMovie = async movieTitle => {
	const title = movieTitle.includes('Ricky') ? 'Riki-Oh' : movieTitle

	const api = 'https://www.omdbapi.com/?apikey=faa9804f'
	const resp = await fetch(`${api}&t=${title}`)
	const data = await resp.json()
	const { Title, Year, Country, Director, Poster, imdbID } = await data

	return {
		id: imdbID,
		title: Title,
		year: Year,
		country: Country,
		director: Director,
		poster: Poster,
		link: 'https://www.imdb.com/title/' + imdbID,
	}
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
	`)
	const episodeTemplate = path.resolve(`src/templates/episode.js`)

	const { episodes } = queryResults.data.spotify

	episodes.forEach((node, i, arr) => {
		const prev = arr[i - 1] ? `/episodio/${arr[i - 1].slug}` : null
		const next = arr[i + 1] ? `/episodio/${arr[i + 1].slug}` : null

		createPage({
			path: `/episodio/${node.slug}`,
			component: episodeTemplate,
			context: {
				episode: {
					...node,
					numberEp: arr.length - i,
					prev,
					next,
				},
			},
		})
	})
}
