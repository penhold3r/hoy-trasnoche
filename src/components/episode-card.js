import React from 'react'
import Link from './link'

const EpisodeCard = ({ episode, numberEp }) => {
	return (
		<Link to={`/episodio/${episode.slug}`} className='episode-card'>
			<span className='episode-number'>Episodio #{numberEp}</span>
			<h3 className='episode-title'>{episode.name}</h3>
			<h4 className='episode-date'>{episode.date}</h4>
		</Link>
	)
}

export default EpisodeCard
