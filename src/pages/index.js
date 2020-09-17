import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Link from '../components/link'
import EpisodesList from '../components/episodes-list'

const IndexPage = () => {
	const {
		spotify: { episodes },
	} = useStaticQuery(
		graphql`
			query {
				spotify {
					episodes {
						weekly {
							id
							name
							slug
							date(formatString: "dddd D [de] MMMM, YYYY", locale: "es")
						}
					}
				}
			}
		`
	)

	return (
		<Layout>
			<div className='container'>
				<p className='lead'>
					Hoy Trasnoche no es otro podcast de cine. Es <em>"el otro"</em> podcast de cine. Para
					los que saben que hay mucho más que los estrenos de la semana.
				</p>
				<p className='lead'>
					Conducen <Link to={'https://twitter.com/sancalori'}>Santiago Calori</Link> y{' '}
					<Link to={'https://twitter.com/FioSargenti'}>Fiorella Sargenti</Link>.
				</p>
				<small>Hoy Trasnoche es un podcast original de Posta.</small>
            {
            episodes && <EpisodesList episodes={episodes.weekly} cls={'weekly'} />
				}
			</div>
		</Layout>
	)
}
export default IndexPage
