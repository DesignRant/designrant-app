import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404" />
      <div className="is-black">
        <h1 className="margin-0">404</h1>
        <p>
          You just hit a route that doesn&#39;t exist. If you managed to get
          here via a button click or a URL that was shared with you, perhaps
          this experience should be talked about on this site. Wouldn't that be
          meta?
        </p>
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
