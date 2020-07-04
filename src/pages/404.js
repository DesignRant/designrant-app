import React from "react"
import { graphql, Link } from "gatsby"
import StringSimilarity from "string-similarity"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const pages = data.allSitePage.nodes.map(({ path }) => path)
  const pathname = location.pathname
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch

  return (
    <Layout>
      <SEO title="404" />
      <div className="is-black">
        <h1 className="margin-0">Well this is awkward.</h1>
        <p>
          You just hit a route that doesn't exist. If you managed to get here
          via a button click or a URL that was shared with you, perhaps this
          experience should be talked about on this site. Wouldn't that be meta?
        </p>
        {result.rating > 0.7 && (
          <h3 className=" margin-3-t margin-3-b">
            You were probably looking for{" "}
            <Link to={result.target} className="is-special-blue">
              {result.target}
            </Link>
          </h3>
        )}
        <p className="margin-3-b margin-5-t">
          Not what you're after? Click your heels together three times and say
          'There's no place like home', press the button below, and you'll be
          there.
        </p>
        <Link to="/">
          <button className="bubble-button">Home</button>
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`
