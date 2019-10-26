import React from 'react';
import { graphql } from 'gatsby';

function BlogSport({ data }) {
    const post = data.markdownRemark;

    return (
        <>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </>
    );
}

export const query = graphql`
    query Post($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug }}) {
            frontmatter {
                title
            }
            html
        }
    }
`;

export default BlogSport;
