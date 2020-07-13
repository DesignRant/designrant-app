// templates/Author/index.jsx
import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import Twitter from "../../content/assets/twitter.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  data: {
    authorYaml: { id, bio, twitter, kofi, buymeacoffee, avatar, from, website },
    allMarkdownRemark: { edges: postNodes },
  },
}) => (
  <Layout>
    <SEO title={id} />
    <Link to="/authors">
      <h4 className="margin-0 margin-2-b">
        <i class="las la-arrow-left"></i> All Authors
      </h4>
    </Link>
    <div
      className="row is-white-bg pad-3 border-radius"
      style={{ maxWidth: 700 }}
    >
      <div className="col-xs-12 col-md-2">
        <Img
          fluid={avatar.childImageSharp.fluid}
          className="avatar-lg"
          alt="avatar"
        />
      </div>
      <div className="col-xs-12 col-md-9">
        <div className="flex ">
          <h1 className="margin-1-tb margin-1-r">{id}</h1>
        </div>
        <h4 className="margin-0-tb">{from.toUpperCase()} </h4>

        {twitter && (
          <div className="margin-1-t">
            <button
              onClick={() => {
                trackCustomEvent({
                  category: "AuthorLink",
                  action: "Click",
                  label: "twitter",
                })
                window.open(`https://twitter.com/${twitter}/`, "_blank")
              }}
            >
              <img src={Twitter} className="twitter grow-lg" alt="twitter" />
            </button>
          </div>
        )}
      </div>
      <div className="col-xs-12">
        <h4>{bio}</h4>
      </div>

      {website && (
        <button
          onClick={() => {
            trackCustomEvent({
              category: "AuthorLink",
              action: "Click",
              label: "website",
            })
            window.open(website, "_blank")
          }}
          className="col-xs-12 col-md-6 margin-3-b"
        >
          <button className="bubble-button border-radius fill-width">
            Vist Site
          </button>
        </button>
      )}
      {(kofi || buymeacoffee) && (
        <button
          onClick={() => {
            trackCustomEvent({
              category: "AuthorLink",
              action: "Click",
              label: kofi ? "kofi" : "buymeacoffee",
            })
            window.open(
              kofi
                ? `https://ko-fi.com/${kofi}/`
                : `https://www.buymeacoffee.com/${buymeacoffee}`,
              "_blank"
            )
          }}
          className="col-xs-12 col-md-6 margin-3-b"
        >
          <button className="bubble-button border-radius fill-width">
            Buy Them A Coffee
          </button>
        </button>
      )}

      <div className="col-xs-12">
        <div className="line is-black opacity-5 margin-3-t" />
        <h4>
          {postNodes.length} post{postNodes.length > 1 ? "s" : ""} by{" "}
          <strong>{id}</strong>
        </h4>
        {postNodes.map(({ node: post }, idx) => (
          <div key={post.id}>
            <a href={post.fields.slug}>
              <p>{post.frontmatter.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(filter: { fields: { authorId: { eq: $authorId } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            author {
              id
            }
          }
          fields {
            authorId
            slug
          }
        }
      }
    }
    authorYaml(id: { eq: $authorId }) {
      id
      bio
      twitter
      kofi
      buymeacoffee
      from
      website
      avatar {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }
`
