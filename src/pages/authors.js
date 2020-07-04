import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import _ from "lodash"

import Twitter from "../../content/assets/twitter.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  data: {
    allAuthorYaml: { edges: authorNodes },
  },
}) => (
  <Layout>
    <SEO title="Authors" />
    <div className="is-black">
      <div className="is-white-bg pad-3 border-radius margin-3-b">
        <h1 className="margin-0 margin-2-b">Authors</h1>
        <p className="margin-4-b margin-0-t">
          We're super lucky to have some great authors that have helped make
          this site what it is. Click a profile for more information and support
          links.
        </p>
      </div>
      <div className="row">
        {authorNodes.map(({ node: author }) => (
          <div
            key={`author-${author.id}`}
            className="col-xs-12 col-md-4  pad-3 is-white-bg border-radius shadow-drop-2-center"
            style={{ position: "relative" }}
          >
            {author.twitter && (
              <div
                className="margin-1-t"
                style={{ position: "absolute", top: 15, right: 15 }}
              >
                <a
                  href={`https://twitter.com/${author.twitter}/`}
                  target="_blank"
                  className=" grow"
                >
                  <img src={Twitter} className="twitter " />
                </a>
              </div>
            )}
            <Link to={`/author/${_.kebabCase(author.id)}`}>
              <div className="row is-black">
                <div className="col-xs-12 col-sm-2 col-md-12 flex align-vertical">
                  <Img
                    fluid={author.avatar.childImageSharp.fluid}
                    className="avatar-lg"
                  />
                </div>
                <div className="col-xs-12 col-sm-10 col-md-12">
                  <h3>{author.id}</h3>
                  <p>{author.bio}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query {
    allAuthorYaml {
      edges {
        node {
          id
          from
          twitter
          bio
          avatar {
            childImageSharp {
              fluid(maxWidth: 80) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`
