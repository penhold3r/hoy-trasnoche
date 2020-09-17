import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import faviconICO from '../images/favicon.ico'
import faviconPNG from '../images/favicon.png'

const SEO = ({ description, lang, meta, title }) => {
	const {
		site: { siteMetadata },
	} = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						siteUrl
						keywords
						author
					}
				}
			}
		`
	)

	const siteTitle = title || siteMetadata.title
	const metaDescription = description || siteMetadata.description
	const { siteUrl, keywords } = siteMetadata

	const opengraph = ''

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={siteTitle}
			titleTemplate={title ? `%s | ${siteMetadata.title}` : siteMetadata.title}
			meta={[
				{
					property: 'og:image',
					content: opengraph,
				},
				{
					name: 'twitter:image',
					content: opengraph,
				},
				{
					name: 'description',
					content: metaDescription,
				},
				{
					property: 'og:description',
					content: metaDescription,
				},
				{
					name: 'twitter:description',
					content: metaDescription,
				},
				{
					property: 'og:title',
					content: siteTitle,
				},
				{
					name: 'twitter:title',
					content: siteTitle,
				},
				{
					property: 'og:url',
					content: siteUrl,
				},
				{
					name: 'twitter:site',
					content: siteUrl,
				},
				{
					property: 'og:type',
					content: 'Website',
				},
				{
					name: 'twitter:card',
					content: 'summary_large_image',
				},
				{
					name: 'keywords',
					content: keywords,
				},
			].concat(meta)}
			link={[
				{
					href: faviconICO,
					rel: 'shortcut icon',
					type: 'image/x-icon',
				},
				{
					href: faviconPNG,
					rel: 'shortcut icon',
					type: 'image/png',
					sizes: '32x32 192x192',
				},
			]}
		/>
	)
}

SEO.defaultProps = {
	lang: `es`,
	meta: [],
	description: ``,
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
}

export default SEO
