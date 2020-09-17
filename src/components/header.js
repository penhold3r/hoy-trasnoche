import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import logo from '../images/hoy-trasnoche_logo.png'

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
			<div className='links'>
				<span>Spotify</span>
				<span>Google</span>
				<span>Apple</span>
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
