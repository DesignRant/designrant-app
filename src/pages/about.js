import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <div className="is-black">
        <h1 className="margin-0">Hi I'm Sam.</h1>
        <h3>
          I try to remain a positive person but being English, I occassionally
          need to complain. This site is a place for me to vent about some of
          the user interfaces and experiences that drive me insane.
        </h3>
        <h3>
          I 'd like to point out that while I can be quite negative here, I also
          think that there are plenty of examples out there where people have
          built awesome, friendly and beautiful user interfaces. Perhaps in the
          future I will build a site dedicated to these too.
        </h3>
        <h3>
          When I'm not complaining, which I assure you is most of the time, you
          can find me <a href="https://sld.codes">here</a>.
        </h3>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
