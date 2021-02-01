require('dotenv').config();
const config = require('./src/content/meta/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
              // linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `50`,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0,
              urlOverrides: [
                          {
                            id: 'youtube',
                            embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                          }
                        ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-external-links`,
            {
              resolve: 'gatsby-remark-emojis',
              options: {
                active: true,
                class: 'emojiIcon',
                size: 64,
                styles: {
                  display: 'inline',
                  width: '22px',
                  'vertical-align': 'top',
                },
              },
            },
          ],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `parts`,
          path: `${__dirname}/src/content/parts/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `${__dirname}/src/content/pages/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `docs`,
          path: `${__dirname}/src/content/docs/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/content/images/`,
        },
      },
      `gatsby-plugin-resolve-src`,
      `gatsby-plugin-catch-links`,
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
      `gatsby-plugin-emotion`,
      `gatsby-plugin-sitemap`,
    ],
  };
