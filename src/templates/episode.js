import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

import Layout from '../components/layout'
import Link from '../components/link'
import MovieCard from '../components/movie-card'

import episodesMovies from '../data/movies'

//https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&titles=Danny_Boyle&format=json

//https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Danny_Boyle_May_2019.jpg/600px-Danny_Boyle_May_2019.jpg

const Episode = ({ pageContext }) => {
	const { episode } = pageContext
	const [moviesData, setMoviesData] = useState([])

	const { movies = null } = episodesMovies.find(item => item.episode === episode.id) || {}
	const api = 'https://www.omdbapi.com/?apikey=faa9804f'

	const fetchMovie = async id => {
		const resp = await fetch(`${api}&i=${id}`)
		const data = await resp.json()
		const { Title, Year, Country, Director, Poster } = await data

		return {
			id,
			title: Title,
			year: Year,
			country: Country,
			director: Director,
			poster: Poster,
			link: 'https://www.imdb.com/title/' + id,
		}
	}

	useEffect(() => {
		const localList = sessionStorage.getItem(`movies-${episode.id}`)

		if (localList) {
			setMoviesData(JSON.parse(localList))
		} else {
			if (movies) {
				movies.forEach(async id => {
					const movie = await fetchMovie(id)
					setMoviesData(currList => {
						sessionStorage.setItem(
							`movies-${episode.id}`,
							JSON.stringify([...currList, movie])
						)
						return [...currList, movie]
					})
				})
			}
		}
	}, [movies, episode.id])

	console.log('EP: ', episode)

	return (
		<Layout pageTitle={`| ${episode.name}`}>
			<section className='episode'>
				<div className='container'>
					<span className='episode__number'>Episodio #{episode.numberEp}</span>
					<h2 className='episode__name'>{episode.name}</h2>
					<div className='episode__meta'>
						<p className='date'>{episode.date}</p>
						<span> &mdash; </span>
						<Link to={isMobile ? episode.urls.app : episode.urls.desktop} className='link'>
							Escuchar en Spotify
						</Link>
					</div>
					<p className='episode__description'>{episode.description}</p>
					{movies ? (
						<div className='movies'>
							{moviesData && (
								<div className='movies__list'>
									{moviesData.map(movie => (
										<MovieCard movie={movie} key={movie.id} />
									))}
								</div>
							)}
						</div>
					) : (
						<div className='in-progress'>
							<p>
								<strong>Peliculas no disponibles por el momento.</strong>
							</p>
							<small>En cuanto tenga tiempo las subo, bancame un toque.</small>
						</div>
					)}
				</div>
			</section>
		</Layout>
	)
}

export default Episode
