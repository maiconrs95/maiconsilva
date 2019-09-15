import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/* Styled Components */
import { AvatarWrapper } from './AvatarStyled';

function Avatar() {
    const { avatarImage } = useStaticQuery(
        graphql`
            query {
                avatarImage: file(relativePath: { eq: "profile.jpg" }) {
                    childImageSharp {
                        fixed(width:    60, height:    60) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `
    );

    return(
        <AvatarWrapper fixed={avatarImage.childImageSharp.fixed} />
    );
}

export default Avatar;
