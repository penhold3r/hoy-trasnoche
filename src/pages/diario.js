import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { isMobile } from 'react-device-detect'

import Layout from '../components/layout'
import MovieCard from '../components/movie-card'
import Link from '../components/link'

const DailyPage = () => {
	const {
		daily: { episodes },
	} = useStaticQuery(
		graphql`
			query {
				daily {
					episodes {
						name
						date(formatString: "dddd D [de] MMMM, YYYY", locale: "es")
						id
						movie {
							year
							title
							poster
							link
							id
							director
							country
						}
						movies {
							year
							title
							poster
							link
							id
							director
							country
						}
						urls {
							app
							desktop
						}
					}
				}
			}
		`
	)

	console.log(episodes)

	return (
		<Layout pageTitle='Diario'>
			<div className='container daily-page'>
				<h2 className='title'>Hoy Trasnoche Diario</h2>
				<p className='intro'>
					Todos los días, una nueva recomendación de Calu y Flor, para que nunca más digas que
					no sabés qué película ver.
				</p>
				<div className='list'>
					{episodes &&
						episodes.map((episode, n) => {
							const epNum = episodes.length - n
							const isDouble = episode.movies?.some(m => m.title)
							const isSingle = episode.movie?.title

							return isSingle || isDouble ? (
								<div
									className={`${isDouble ? 'episode-card double' : 'episode-card'}`}
									key={episode.id}>
									<span className='episode-number'>Episodio #{epNum}</span>
									<span className='episode-date'>{episode.date}</span>

									{isDouble ? (
										episode.movies.map(
											movie => movie.title && <MovieCard movie={movie} key={movie.id} />
										)
									) : (
										<MovieCard movie={episode.movie} />
									)}

									<Link
										to={isMobile ? episode.urls.app : episode.urls.desktop}
										className='link'>
										Escuchar en Spotify
									</Link>
								</div>
							) : null
						})}
				</div>
			</div>
		</Layout>
	)
}

export default DailyPage
