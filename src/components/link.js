import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, to, activeClassName, ...other }) => {
	const internal = /^\/(?!\/)/.test(to)

	if (internal)
		return (
			<GatsbyLink to={to} activeClassName={activeClassName} {...other}>
				{children}
			</GatsbyLink>
		)
	else
		return (
			<a href={to} {...other} target='_blank' rel='noopener noreferrer'>
				{children}
			</a>
		)
}

export default Link
