import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { css } from 'emotion';

// a masonry-style grid of featured posts

const Featured = props => {
  const { featuredPosts, title } = props;

  return (
    <React.Fragment>
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `}
      >
        {title ? (
          <h2
            css={css`
              text-align: center;
              font-weight: normal;
              font-size: 28px;
              margin-bottom: 1.5em;
              margin-top: 0;
              border-bottom: 1.5px solid #ccc;
              padding-bottom: 1em;
              max-width: 1000px;
              width: 100%;
            `}
          >
            {title}
          </h2>
        ) : null}
        <div
          css={css`
            flex: 1 0 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            max-width: 1300px;
          `}
        >
          {featuredPosts.edges.map(post => {
            const featuredPostUrl = post.node.fields.slug;
            return (
              <div
                css={css`
                  margin: 5px;
                  flex: 0 1;
                  position: relative;
                `}
              >
                <a
                  key={post.id}
                  href={featuredPostUrl}
                  title={post.node.frontmatter.title}
                >
                  <Img
                    fluid={
                      post.node.frontmatter.featuredImage.childImageSharp.fluid
                    }
                    alt={post.node.frontmatter.title}
                    css={css`
                      max-width: 100%;
                      border-radius: 10px;
                      width: 350px;
                      box-shadow: -2px 2px 8px 1px rgba(0, 0, 0, .3);
                      height: 300px;
                      &:hover {
                         transform: scale(.9);
                       }
                    `}
                  />
                  <div
                    css={css`
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      background: #fff;
                      color: var(--linkColor);
                      padding: 5px;
                      font-weight: bold;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                      border-bottom-right-radius: 3px;
                      border-bottom-left-radius: 3px;
                      &:hover {
                        color: var(--hoverLinkColor);
                      }
                      }
                      }
                    `}
                  >
                    {post.node.frontmatter.title}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

Featured.propTypes = {
  title: PropTypes.string, // optional heading text
  featuredPosts: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string,
          frontmatter: PropTypes.shape({
            featuredImage: PropTypes.shape({
              fluid: PropTypes.shape({
                src: PropTypes.string, // url of resized image
                originalImg: PropTypes.string, // url of original image asset
              }),
            }),
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string, // e.g. "my-post-title" (page url)
          }),
        }),
      })
    ),
  }),
};

export default Featured;
