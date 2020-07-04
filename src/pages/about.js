import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteIntro = data.markdownRemark.html
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <div className="is-black is-white-bg pad-3 pad-10-b ">
        <div dangerouslySetInnerHTML={{ __html: siteIntro }}></div>
        <div className="row">
          <div className="pad-0 col-xs-12 col-md-4 margin-2-t margin-1-lr">
            <Link to="/">
              <button className="bubble-button border-radius fill-width">
                Start Reading
              </button>
            </Link>
          </div>
          <div className="pad-0 col-xs-12 col-md-4 margin-2-t margin-1-lr">
            <a href="https://github.com/slarsendisney/designrant.app">
              <button className="bubble-button border-radius fill-width">
                Contribute
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { type: { eq: "About" } }) {
      html
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
