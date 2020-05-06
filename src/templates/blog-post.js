import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="is-white-bg">
        <Img
          fluid={post.frontmatter.hero.childImageSharp.fluid}
          className="shadow"
          style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
        />
        <div className=" pad-3">
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </p>

          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
          <footer>
            <Bio />
          </footer>
        </div>
      </div>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <p>← {previous.frontmatter.title}</p>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <p>{next.frontmatter.title} →</p>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        tags
        hero {
          childImageSharp {
            fluid(maxWidth: 1000) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
