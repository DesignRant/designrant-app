import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Legal = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteIntro = data.markdownRemark.html
  return (
    <Layout location={location} title={siteTitle}>
        <SEO title="Legal" />
        <div className="is-black is-white-bg pad-3 pad-10-b ">
            <div className="row">
                <div className="col-xs-12">
                    <h1>Legal</h1>
                </div>
                <div className="col-xs-12">
                    <p>The following links outline DesignRant's Legal policies and describe all our disclaimers, our Cookie Policy, and our Privacy Policy.</p>
                    <p></p>
                </div>
            </div>
        <div className="row">
            <div className="pad-0 col-xs-12 col-md-3 margin-2-t margin-1-lr">
                <Link to="/legal/disclaimer">
                    <button className="bubble-button border-radius fill-width">
                        Disclaimer
                    </button>
                </Link>
            </div>
            <div className="pad-0 col-xs-12 col-md-3 margin-2-t margin-1-lr">
                <Link to="/legal/privacy-policy">
                    <button className="bubble-button border-radius fill-width">
                        Privacy Policy
                    </button>
                </Link>
            </div>
            <div className="pad-0 col-xs-12 col-md-3 margin-2-t margin-1-lr">
                <Link to="/legal/cookie-policy">
                    <button className="bubble-button border-radius fill-width">
                        Cookie Policy
                    </button>
                </Link>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Legal

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
