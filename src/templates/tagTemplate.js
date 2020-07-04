import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Img from 'gatsby-image';
import ArticlePreview from "../components/PreviewBlocks/ArticlePreview"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO
        title={tag}
        keywords={[`design rant`, `rant`, `blog`, `UX`, `UI`, `design`]}
      />
      <div className="row">
        <div className="col-xs-12">
          <h3 className="is-black margin-0 margin-3-b">{tagHeader}</h3>
        </div>
        <div className="col-xs-12">
          {edges.map(({ node }) => {
            return (
              <ArticlePreview
                title={node.frontmatter.title}
                date={node.frontmatter.date}
                tags={node.frontmatter.tags}
                slug={node.fields.slug}
                description={node.frontmatter.description}
                excerpt={node.excerpt}
              />
            )
          })}
        </div>
        <div className="col-xs-12">
          <Link to="/tags">
            <h3 className="is-black margin-0 margin-3-b">All tags</h3>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            tags
            description
            date(formatString: "MMMM DD, YYYY")
            hero {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
