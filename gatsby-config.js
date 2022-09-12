const config = require('./config/meta')

module.exports = {
  siteMetadata: {
    title: `Utility Front Group Political Ad Spending`,
    description: `A simple tool to explore how much utility front groups spend on political advertisements.`,
    author: `Energy and Policy Institute - Shelby Green`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-styled-components`,
    //   options: {
    //     displayName: process.env.NODE_ENV !== `production`,
    //     fileName: false,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `./config/typography.js`,
    //   },
    // },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: `/`,
        // background_color: config.manifest.backgroundColor,
        // theme_color: config.manifest.themeColor,
        display: `standalone`,
        icon: `src/images/epiLogo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline/
    // `gatsby-plugin-offline`,
  ],
}