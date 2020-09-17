import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout';

const DailyPage = () => {
   const {
		spotify: { episodes },
	} = useStaticQuery(
		graphql`
			query {
				spotify {
					episodes {
						daily {
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
   
   console.log(episodes)

   return (
      <Layout pageTitle="Diario">
         <div className="container">
            <h2>Diario</h2>
            <div className="list"></div>
         </div>
      </Layout>
   );
}

export default DailyPage;