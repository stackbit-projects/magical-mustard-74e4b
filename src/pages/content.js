import React from 'react';
import { graphql } from 'gatsby';

import 'styles/variables';
import 'styles/global';

import Article from 'components/Article';
import Branding from 'components/Branding';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import List from 'components/List';
import Menu from 'components/Menu';
import Seo from 'components/Seo';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';
import categoryList from 'content/meta/categories';

const ContentPage = props => {
  const {
    data: {
      pages: { edges: rawPages },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
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

  const pages = rawPages.map(page => page.node);

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Article>
        <Heading title="My Work" />
        <List pages={pages} categoryList={categoryList} />
      </Article>
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

export default ContentPage;

export const query = graphql`
  query {
    pages: allMarkdownRemark(
      filter: { fields: { source: { eq: "docs" } } }
      sort: { fields: [fields___prefix] }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            shortTitle
            categories
          }
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
  }
`;
