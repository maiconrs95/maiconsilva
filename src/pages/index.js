import React from "react";
import { useStaticQuery, graphql } from 'gatsby';

import SEO from "../components/seo";
import { Layout, PostItem } from "../components";

function IndexPage() {
    const { allMarkdownRemark } = useStaticQuery(graphql`
        query PostList {
            allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
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
        }`
    );

    const postList = allMarkdownRemark.edges;

    return (
        <Layout>
            <SEO title="Home" />
            {postList.map(({
                node: {
                fields: {
                    slug,
                },
                frontmatter: {
                    date, title, category, background, description,
                },
                timeToRead,
            }}, i) => (
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
        </Layout>
    );
};

export default IndexPage
