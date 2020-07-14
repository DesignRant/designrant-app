import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleShareOptions from "../components/Article/ArticleShareOptions"
import RantWorthy from "../components/Article/RantWorthy"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  function sanitizeMarkdown(textInput) {
    var Filter = require("bad-words"),
      filter = new Filter()
    return filter.clean(textInput) //Don't be an ******
  }

  const sanitizedPost = sanitizeMarkdown(post.html)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        location={location}
        description={post.frontmatter.description || post.excerpt}
        image={
          "https://designrant.app" +
          post.frontmatter.hero.childImageSharp.fluid.src
        }
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
          <div className="flex align-horizontal margin-2-t">
            <p className="is-black margin-0 margin-1-r">
              {post.frontmatter.date}
            </p>
          </div>
          <div className="flex align-horizontal margin-2-t">
            {post.frontmatter.tags.map((item, index) => (
              <Link to={`/tags/${_.kebabCase(item)}`}>
                <p className={`tag-primary ${index !== 0 ? "margin-1-l" : ""}`}>
                  {item}
                </p>
              </Link>
            ))}
          </div>
          <div className="margin-5-b lato">
            <section
              className="article"
              dangerouslySetInnerHTML={{ __html: sanitizedPost }}
            />
          </div>
          <RantWorthy location={location} />
          <div className="line opacity-5 margin-5-t margin-5-b" />
          <ArticleShareOptions
            location={location}
            twitter={post.frontmatter.author.twitter}
            desc={post.frontmatter.description}
          />
          <div className="line opacity-5 margin-5-t" />
          <footer>
            <Link to={`/author/${_.kebabCase(post.frontmatter.author.id)}`}>
              <div
                className="flex align-vertical align-horizontal is-black pad-5"
                style={{ justifyContent: "center" }}
              >
                <Img
                  fluid={post.frontmatter.author.avatar.childImageSharp.fluid}
                  className="margin-2-b avatar-md"
                />
                <div>
                  <p className="margin-0">
                    Written by <strong>{post.frontmatter.author.id}.</strong>
                  </p>
                  <p className="margin-0">{post.frontmatter.author.shortBio}</p>
                </div>
              </div>
            </Link>
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
        author {
          id
          from
          twitter
          website
          shortBio
          avatar {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
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
