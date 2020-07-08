import React from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LegalTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <div className="is-white-bg">
        <div className=" pad-3">  
          <div className="margin-5-b lato">
            <section
              className="article"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="line opacity-5 margin-5-t" />
          <footer>
              <div
                className="flex align-vertical align-horizontal is-black pad-5"
                style={{ justifyContent: "center" }}
              >
                <div>
                  <p className="margin-0">
                    Written by <Link to="/"><strong>DesignRant</strong></Link>
                  </p>
                </div>
              </div>
          </footer>
        </div>
      </div>
    </Layout>
  )
}

export default LegalTemplate

export const pageQuery = graphql`
  query LegalBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title        
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
