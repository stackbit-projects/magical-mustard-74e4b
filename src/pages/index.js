import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from 'emotion';

import 'styles/variables';
import 'styles/global';

import Branding from 'components/Branding';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Featured from 'components/Featured';
import Layout from 'components/Layout';
import Menu from 'components/Menu';
import Seo from 'components/Seo';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';

const IndexPage = props => {
  const {
    data: {
      footerLinks: { html: footerLinksHTML },
      hero: { html: heroHTML },
      copyright: { html: copyrightHTML },
      logo: {
        childImageSharp: { fluid: logoFluid },
      },
      featuredPosts,
    },
  } = props;

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteTitle,
    siteDescription,
    siteLanguage,
  } = config;

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Hero>
        <Img fluid={logoFluid} className="image" />
        <div dangerouslySetInnerHTML={{ __html: heroHTML }} />
      </Hero>
      <Featured featuredPosts={featuredPosts} title={'Featured Posts:'}/>
      <Footer links={footerLinksHTML} copyright={copyrightHTML} />
      <Seo
        url={siteUrl}
        language={siteLanguage}
        title={siteTitle}
        description={siteDescription}
      />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    logo: file(relativePath: { regex: "/logo_nik3.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    hero: markdownRemark(fileAbsolutePath: { regex: "/content/parts/hero/" }) {
      html
    }
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
    featuredPosts: allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { featured: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            source
          }
          frontmatter {
            title
            name
            _PARENT
            shortTitle
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 590) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
