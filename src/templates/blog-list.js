import React from 'react';
import { graphql } from 'gatsby';

import SEO from "../components/seo";
import { Layout, PostItem, Pagination } from "../components";
import { ListWrapper } from '../components/ListWrapper/ListWrapperStyled';

function BlogList(props) {
    const { data, pageContext } = props;
    const { currentPage, numPages } = pageContext;

    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = (currentPage - 1 === 1) ? `/` : `/page/${currentPage - 1}`;
    const nextPage = `/page/${currentPage + 1}`;

    const postList = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <SEO title="Home" />
            <ListWrapper>
                {postList.map(({
                    node: {
                        fields: {
                            slug,
                        },
                        frontmatter: {
                            date, title, category, background, description,
                        },
                        timeToRead,
                    } }, i) => (
                        <PostItem
                            key={i}
                            slug={slug}
                            background={background}
                            category={category}
                            date={date}
                            timeToRead={timeToRead}
                            title={title}
                            description={description}
                        />
                    ))}
            </ListWrapper>

            <Pagination
                isFirst={isFirst}
                isLast={isLast}
                currentPage={currentPage}
                numPages={numPages}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        </Layout>
    );
}

export const query = graphql`
    query BlogList($skip: Int!, $limit: Int!) {
        allMarkdownRemark(sort: {
            fields: frontmatter___date, order: DESC
        },
            limit: $limit,
            skip: $skip,
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        category
                        background
                        date(formatString: "DD [de] MMM [de] YYYY", locale: "pt-br")
                    }
                    timeToRead
                }
            }
        }
    }
`;

export default BlogList;
