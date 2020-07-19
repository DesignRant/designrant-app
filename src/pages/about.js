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
        <h1 className="margin-1-tb">DesignRant</h1>
        <div dangerouslySetInnerHTML={{ __html: siteIntro }}></div>
        <div className="row">
          <div className="pad-1 col-xs-12 col-md-4 margin-2-t ">
            <Link to="/">
              <button className="bubble-button border-radius fill-width">
                Start Reading
              </button>
            </Link>
          </div>
          <div className="pad-1 col-xs-12 col-md-4 margin-2-t ">
            <a href="https://write.designrant.app">
              <button className="bubble-button border-radius fill-width">
                Contribute
              </button>
            </a>
          </div>
          <div className="pad-1 col-xs-12 col-md-4 margin-2-t ">
            <a
              href="https://twitter.com/DesignRantApp"
              class="twitter-follow-button"
              data-show-count="false"
            >
              <button className="bubble-button border-radius fill-width is-special-blue-bg-always">
                Twitter
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
