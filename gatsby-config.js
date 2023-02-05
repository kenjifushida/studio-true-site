/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Studio True`,
    description: `studio TRUEは寺内玲と松岡大雅によるデザイン事務所です。`,
    author: `@reiterauchi`,
    siteUrl: `https://studio-true.net/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WP_GRAPHQL_URL ||
          `http://studio-true.online/graphql`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/ // See below to configure properly
        }
      }
    },
    `gatsby-plugin-sass`,
    `postcss-reporter`,
    {
      resolve: `gatsby-plugin-react-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`ja`, `en`],
        defaultLanguage: `ja`,
        redirect: true,
        redirectDefaultLanguageToRoot: true,
        ignoredPaths: [],
        fallbackLanguage: `ja`
      }
    }
  ],
}
