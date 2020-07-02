module.exports = {
  siteMetadata: {
    title: `DesignRant`,
    author: {
      name: `Sam Larsen-Disney`,
      summary: `When he's not complaining, he likes documenting the cool things he learns and helping the next generation to code.`,
    },
    description: `Short, sharp user experience complaints.`,
    siteUrl: `https://designrant.app/`,
    social: {
      twitter: `slarsendisney`,
    },
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
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
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
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DesignRant.app`,
        short_name: `DesignRant`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
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
      },
    },
  ],
}
