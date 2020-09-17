import React from 'react'
import PropTypes from 'prop-types'

import SEO from './SEO'
import Header from './header'

import 'sanitize.css'
import '../styles/global.scss'

const Layout = ({ children, pageTitle }) => (
	<>
		<SEO title={pageTitle} />
		<Header />
		<main>{children}</main>
	</>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	pageTitle: PropTypes.string,
}

export default Layout
