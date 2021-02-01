import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';


import 'styles/variables';
import 'styles/global';

import 'prismjs/themes/prism-okaidia.css';


import Bodytext from 'components/Bodytext';
import Article from 'components/Article';
import Branding from 'components/Branding';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import List from 'components/List';
import Menu from 'components/Menu';
import Seo from 'components/Seo';
import Sidebar from 'components/Sidebar';
import layoutSidebar from '../styles/layoutSidebar';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';
import categoryList from 'content/meta/categories';

const PageTemplate = props => {
  const {
    location: { pathname },
    data: {
      page: {
        html: pageHTML,
        frontmatter: { title },
        fields: { slug, source },
        excerpt,
      },
      pages: { edges: nodePages },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
    },
  } = props;

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteLanguage,
    siteTitlePostfix,
  } = config;

  const pages = nodePages.map(item => item.node);
  const layoutStyle = source === 'docs' ? layoutSidebar : undefined;

  return (
    <React.Fragment>
      {layoutStyle && (
        <Sidebar
          title="Table of Contents"
          pages={pages}
          categoryList={categoryList}
          pathname={slug}
        />
      )}
      <Layout themeStyle={layoutStyle}>
        <Header>
          <Branding title={headerTitle} subTitle={headerSubTitle} />
          <Menu items={menuItems} />
        </Header>
        <Article>
          <Heading title={title} />
          <Bodytext html={pageHTML} />
        </Article>
        <Footer links={footerLinksHTML} copyright={copyrightHTML} />
        <Seo
          url={`${siteUrl}${slug}`}
          language={siteLanguage}
          title={`${title}${siteTitlePostfix}`}
          description={excerpt}
        />
      </Layout>
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fileAbsolutePath
      fields {
        slug
        prefix
        source
      }
      frontmatter {
        title
        categories
      }
    }
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
          headings {
            value
            depth
          }
          tableOfContents
        }
      }
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
