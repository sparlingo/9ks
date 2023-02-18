import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Pagination } from 'flotiq-components-react';
import Layout from '../layouts/layout';
import BlogCards from '../sections/BlogCards';
import Announcement from '../components/Announcement';

const IndexPage = ({ data, pageContext }) => {
    const posts = data.allBlogpost.nodes;
    return (
        <Layout additionalClass={['bg-light-gray']}>
            <Helmet>
                <title>{data.site.siteMetadata.title}</title>
                <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                />
            </Helmet>
            <Announcement content="This site is for Shenzhen QSI, homeroom 9KS" />
            <BlogCards posts={posts} />
            <Pagination page={pageContext.currentPage} numOfPages={pageContext.numPages} rounded="md" />
        </Layout>
    );
};

export const pageQuery = graphql`
query indexQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allBlogpost(
      sort: {flotiqInternal: {createdAt: DESC}}
      limit: $limit
      skip: $skip
    ) {
      nodes {
        headerImage {
          extension
          url
          width
          height
          localFile {
            publicURL
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
            }
          }
        }
        id
        excerpt
        slug
        title
        flotiqInternal {
          createdAt
        }
      }
    }
  }
`;

export default IndexPage;
