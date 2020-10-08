import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import logo from '../images/hoy_trasnoche-logo_web.svg'

import posta from '../images/icons/posta.svg'
import spotify from '../images/icons/spotify.svg'
import apple from '../images/icons/apple-podcasts.svg'
import google from '../images/icons/google-podcasts.svg'

// https://podcasts.apple.com/us/podcast/podcasting-smarter/id1226212636?ls=1&mt=2

// https://podcasts.google.com/?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84MWU0ZWUwL3BvZGNhc3QvcnNz

// https://open.spotify.com/show/6C4MdNWQSPhmzBlIVau30e

// https://posta.fm/hoytrasnoche/home

const Header = ({ siteTitle }) => (
	<header className='header'>
		<div className='inner-header'>
			<h1 className='logo'>
				<Link to='/'>
					<img src={logo} alt={siteTitle} />
				</Link>
			</h1>
			<nav className='navigation'>
				<Link to='/'>Inicio</Link>
				<Link to='/diario'>Trasnoche Diario</Link>
			</nav>
			<div className='links'>
				<a
					href='https://posta.fm/hoytrasnoche/home'
					target='_blank'
					rel='noopener noreferrer'
					title='Posta'>
					<img src={posta} alt='Posta' />
				</a>
				<a
					href='https://open.spotify.com/show/6C4MdNWQSPhmzBlIVau30e'
					target='_blank'
					rel='noopener noreferrer'
					title='Spotify'>
					<img src={spotify} alt='Spotify' />
				</a>
				<a
					href='https://podcasts.apple.com/us/podcast/podcasting-smarter/id1226212636?ls=1&mt=2'
					target='_blank'
					rel='noopener noreferrer'
					title='Apple Podcasts'>
					<img src={apple} alt='Apple Podcasts' />
				</a>
				<a
					href='https://podcasts.google.com/?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84MWU0ZWUwL3BvZGNhc3QvcnNz'
					target='_blank'
					rel='noopener noreferrer'
					title='Google Podcasts'>
					<img src={google} alt='Google Podcasts' />
				</a>
			</div>
		</div>
	</header>
)

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
