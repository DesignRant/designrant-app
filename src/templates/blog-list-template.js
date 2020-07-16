import React from "react"
import { Link, graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SubscribeForm from "../components/Article/Newsletter/Subscribe"

export default ({ data }) => {
  const { currentPage, numPages } = data.sitePage.context
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout showAuthors>
      <SEO title={`${currentPage}`} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Link
            style={{ boxShadow: `none`, textDecoration: "none" }}
            to={node.fields.slug}
          >
            <div className="row is-white-bg  margin-3-b shadow-drop-2-center is-black ">
              <div className="col-xs-12 pad-0 hide-on-big">
                <Img
                  fluid={node.frontmatter.hero.childImageSharp.fluid}
                  className="shadow "
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className=" col-xs-12  col-md-8 ">
                <div key={node.fields.slug} className=" pad-3-lr pad-2-tb">
                  <div>
                    <h2 className="margin-1-b">{title}</h2>
                  </div>
                  <section>
                    <p
                      className="is-black margin-0 margin-2-t"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>

                  <div className="flex align-horizontal margin-3-t">
                    <Link
                      to={`/author/${_.kebabCase(node.frontmatter.author.id)}`}
                    >
                      <Img
                        fluid={
                          node.frontmatter.author.avatar.childImageSharp.fluid
                        }
                        className="avatar-sm"
                      />
                    </Link>
                    <p className="is-black margin-3-t margin-1-l block">
                      <Link
                        to={`/author/${_.kebabCase(
                          node.frontmatter.author.id
                        )}`}
                        className="is-black"
                      >
                        {node.frontmatter.author.id}
                      </Link>{" "}
                      on {node.frontmatter.date}
                    </p>
                  </div>
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
              <button
                onClick={()=> {
                  trackCustomEvent({
                    category: "Mailing List",
                    action: "Click",
                    label: "subscribed",
                  })
                  navigate(item === 1 ? `/` : `/${item}`)
                }}
              >
                <div
                  className={`${
                    item === currentPage
                      ? "is-black-border is-white-bg is-black  "
                      : "is-black-border is-black-bg is-white "
                  } pad-2-lr pad-1-tb margin-1 `}
                >
                  <p className="margin-0">{item}</p>
                </div>
              </button>
            )
        )}
      </div>
      <div>
        <p>Get the weekly DesignRant newsletter straight to your inbox.</p>
        <SubscribeForm />
      </div>
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
      filter: { frontmatter: { type: { eq: "Post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            author {
              id
              from
              twitter
              website
              bio
              avatar {
                childImageSharp {
                  fluid(maxWidth: 40) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            hero {
              childImageSharp {
                fluid(maxWidth: 1000) {
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
