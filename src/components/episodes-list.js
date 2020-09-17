import React from 'react'
import EpisodeCard from './episode-card'

const EpisodesList = ({ episodes, cls }) => {
	return (
		<div className={`${cls} episodes-list`}>
			{episodes.length > 1 &&
				episodes.map((ep, n) => {
					const epNum = episodes.length - n
					return <EpisodeCard key={ep.id} episode={ep} numberEp={epNum} />
				})}
		</div>
	)
}

export default EpisodesList
