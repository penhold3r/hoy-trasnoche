import React from 'react'

import Link from './link'

const MovieCard = ({ movie }) => {
	const fallBackPoster = 'https://via.placeholder.com/210x295?text=SinPoster'

	return (
		<div className='movie-card' data-id={movie.id}>
			<div className='poster'>
				<img src={movie.poster === 'N/A' ? fallBackPoster : movie.poster} alt={movie.title} />
			</div>
			<div className='data'>
				<h4 className='title'>{movie.title}</h4>
				<h5 className='director'>
					<span>Dirección: </span>
					<span className='name'>{movie.director}</span>
				</h5>
				<p className='info'>
					{movie.year} &mdash; {movie.country}
				</p>
			</div>
			<Link to={movie.link} className='imdb'>
				Ver en IMDB
			</Link>
		</div>
	)
}

export default MovieCard
