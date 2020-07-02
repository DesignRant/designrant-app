import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <p>
        Written by <strong>{author.name}.</strong> {` `}
        {author.summary}
        {` `}
        <a className="is-special-blue" href={`https://sld.codes`}>
          You should check out his website.
        </a>
      </p>
    </div>
  )
}

export default Bio
