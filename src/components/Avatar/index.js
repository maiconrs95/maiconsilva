import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/* Styled Components */
import { AvatarWrapper } from './styles';

function Avatar() {
    const { avatarImage } = useStaticQuery(
        graphql`
            query {
                avatarImage: file(relativePath: { eq: "profile.jpg" }) {
                    childImageSharp {
                        fluid(maxWidth: 60) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        `,
    );

    return <AvatarWrapper fluid={avatarImage.childImageSharp.fluid} />;
}

export default Avatar;
