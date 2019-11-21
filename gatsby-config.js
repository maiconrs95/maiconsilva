require('dotenv').config();

const queries = require('./src/utils/algolia.queries');

module.exports = {
    siteMetadata: {
        title: `Maicon Silva`,
        position: 'Web Developer',
        company: '<a href="https://ingresse.com" target="blank">Ingresse</a>',
        description: `Front End at`,
        author: `Maicon Silva`,
        siteUrl: 'https://maiconsilva.me',
    },
    plugins: [
        `gatsby-plugin-transition-link`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        // needs to be the first to work with gatsby-remark-images
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `uploads`,
                path: `${__dirname}/static/assets/img`,
            },
        },
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
                name: `posts`,
                path: `${__dirname}/posts`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-relative-images",
                        options: {
                            name: "options",
                        }
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 960,
                            linkImagesToOriginal: false,
                        },
                    },
                    {
                        resolve: "gatsby-remark-external-links",
                        options: {
                            target: "_blank",
                            rel: "nofollow"
                        }
                    },
                    "gatsby-remark-lazy-load",
                    "gatsby-remark-prismjs",
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-algolia-search`,
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
                queries,
                chunkSize: 10000,
                enablePartialUpdates: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Maicon Silva`,
                short_name: `Maicon Silva`,
                start_url: `/`,
                background_color: `#333333`,
                theme_color: `#333333`,
                display: `minimal-ui`,
                icon: `src/images/favicon-32x32.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_ANALYTICS,
            },
        },
        `gatsby-plugin-sitemap`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify-cms`,
    ],
}
