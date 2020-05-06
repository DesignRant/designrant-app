import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const { currentPage, numPages } = data.sitePage.context
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title={`Page ${currentPage}`} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Link
            style={{ boxShadow: `none`, textDecoration: "none" }}
            to={node.fields.slug}
            className=""
          >
            <div className="row is-white-bg  margin-3-b grow link">
              <div className="col-xs-12 pad-0 hide-on-big">
                <Img
                  fluid={node.frontmatter.hero.childImageSharp.fluid}
                  className="shadow"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className=" col-xs-12  col-md-8 ">
                <div key={node.fields.slug} className=" pad-3-lr pad-2-tb  ">
                  <div>
                    <h2 className="margin-1-b">{title}</h2>
                  </div>
                  <div className="flex align-horizontal">
                    <p className="is-black margin-0 margin-1-r">
                      {node.frontmatter.date}
                    </p>
                    {node.frontmatter.tags.map((item, index) => (
                      <p
                        className={`margin-0 pad-1-tb pad-2-lr is-light-grey-bg border-radius-sm is-black ${
                          index !== 0 ? "margin-1-l" : ""
                        }`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                  <section>
                    <p
                      className="is-black"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                  <section className="flex"></section>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 pad-0 hide-on-small">
                <Img
                  fluid={node.frontmatter.hero.childImageSharp.fluid}
                  className="shadow"
                  style={{
                    width: "100%",
                    height: "100%",

                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </Link>
        )
      })}
      <div className="flex margin-5-b" style={{ justifyContent: "center" }}>
        {Array.from({ length: 5 }, (v, k) => k + 1).map(
          item =>
            item <= numPages && (
              <Link to={item === 1 ? `/` : `/${item}`}>
                <div
                  className={`${
                    item === currentPage
                      ? "is-black-border is-white-bg is-black  "
                      : "is-black-border is-black-bg is-white "
                  } pad-2-lr pad-1-tb margin-1  grow `}
                >
                  <p className="margin-0">{item}</p>
                </div>
              </Link>
            )
        )}
      </div>
      <footer className="is-black text-align-center">
        I'm not usually this negative. To see something more positive, visit{" "}
        {""}
        <a href="https://sld.codes/">sld.codes</a>.
      </footer>
    </Layout>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $slug: String!) {
    sitePage(path: { eq: $slug }) {
      context {
        limit
        skip
        numPages
        currentPage
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
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
            title
            description
          }
        }
      }
    }
  }
`
