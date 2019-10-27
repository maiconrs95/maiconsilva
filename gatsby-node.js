const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === "MarkdownRemark") {
        const slug = createFilePath({
            node,
            getNode,
            basePath: "pages",
        });

        createNodeField({
            node,
            name: "slug",
            value: `/${slug.slice(12)}`,
        });
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return graphql(`
        {
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
        }
    `).then((result) => {
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/blog-post.js'),
                context: {
                    slug: node.fields.slug,
                },
            })
        });

        const postsPerPage = 5;
        const numPages = Math.ceil(posts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, index) => {
            createPage({
                path: index === 0 ? `/` : `/page/${index + 1}`,
                component: path.resolve('./src/templates/blog-list.js'),
                context: {
                    numPages,
                    skip: index * postsPerPage,
                    limit: postsPerPage,
                    currentPage: index + 1,
                },
            })
        });
    });
};
