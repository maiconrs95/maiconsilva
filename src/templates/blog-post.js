import React from 'react';
import { graphql } from 'gatsby';

import SEO from "../components/seo";
import { Layout, RecommendedPosts, Comments } from "../components";

/* Styled Components */
import { PostHeader, PostTitle, PostDescription, PostDate, MainContent } from '../styles/base';

function BlogSport({ data, pageContext }) {
    const post = data.markdownRemark;
    const { nextPost: next, previousPost: previous } = pageContext;

    return (
        <Layout>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.title}
                image={post.frontmatter.image}
            />
            <PostHeader>
                <PostDate>
                    {post.frontmatter.date} - {post.timeToRead} min de leitura
                </PostDate>
                <PostTitle>
                    {post.frontmatter.title}
                </PostTitle>
                <PostDescription>
                    {post.frontmatter.description}
                </PostDescription>
            </PostHeader>

            <MainContent>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </MainContent>
            <RecommendedPosts next={next} previous={previous} />
            <Comments url={post.fields.slug} title={post.frontmatter.title} />
        </Layout>
    );
}

export const query = graphql`
    query Post($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug }}) {
            frontmatter {
                title
                description
                date(locale: "pt-br", formatString: "DD [de] MMM [de] YYYY")
                image
            }
            fields {
                slug
            }
            html
            timeToRead
        }
    }
`;

export default BlogSport;
