import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, title, image, location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || "https://ik.imagekit.io/sld/cover_odI2P6tOsR.png"
  const url = location
    ? "https://designrant.app" + location.pathname
    : "https://designrant.app"

  return (
    <Helmet>
      <title>DesignRant | {title}</title>

      <meta name="title" content={`${title} | DesignRant `} />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} | DesignRant `} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="DesignRant" />
      <meta name="twitter:title" content={`${title} | DesignRant `} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
      <html lang="en" />
    </Helmet>
  )
}

export default SEO
