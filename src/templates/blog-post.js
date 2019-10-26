import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from "../components";
import SEO from "../components/seo";

/* Styled Components */
import { PostHeader, PostTitle, PostDescription, PostDate, MainContent } from '../components/Post/PostStyled';

function BlogSport({ data }) {
    const post = data.markdownRemark;

    return (
        <Layout>
            <SEO title={post.frontmatter.title} />
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
            }
            html
            timeToRead
        }
    }
`;

export default BlogSport;
