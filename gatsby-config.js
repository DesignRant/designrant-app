require("dotenv").config({
  path: `.env`,
})

const dynamicPlugins = []

if (process.env.GATSBY_PRODUCTION) {
  dynamicPlugins.push({
    resolve: "gatsby-plugin-firebase",
    options: {
      credentials: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DB_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_SB,
        messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
    },
  })
  dynamicPlugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.VIEW_ID,
    },
  })
}

module.exports = {
  siteMetadata: {
    title: `DesignRant`,
    description: `Short, sharp user experience complaints.`,
    siteUrl: `https://designrant.app/`,
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://codes.us4.list-manage.com/subscribe/post?u=0cf960d42e04bd50f7c21d709&amp;id=b09e53f081",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `assets`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DesignRant.app`,
        short_name: `DesignRant`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-use-dark-mode",
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `description`, `tags`],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags.join(" "),
            description: node => node.frontmatter.description,
            slug: node => node.fields.slug,
            date: node => node.frontmatter.date,
          },
        },
        filter: (node, getNode) => node.frontmatter.type === "Post",
      },
    },
  ].concat(dynamicPlugins),
}
