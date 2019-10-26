import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/* Components */
import { Avatar } from '../';

/* Styled Components */
import {
    ProfileWrapper,
    ProfileLink,
    ProfileAuthor,
    ProfilePosition,
    ProfileDescription,
} from './ProfileStyled';

function Profile() {
    const {
        site: {
            siteMetadata: { title, position, description },
        },
    } = useStaticQuery(graphql`
        query MySiteMetadata {
            site {
                siteMetadata {
                    title
                    position
                    description
                }
            }
        }
    `);

    return (
        <ProfileWrapper>
            <ProfileLink to="/">
                <Avatar />
                <ProfileAuthor>
                    {title}
                    <ProfilePosition>
                        {position}
                    </ProfilePosition>
                </ProfileAuthor>
            </ProfileLink>
            <ProfileDescription>
                {description}
            </ProfileDescription>
        </ProfileWrapper>
    );
}

export default Profile;
