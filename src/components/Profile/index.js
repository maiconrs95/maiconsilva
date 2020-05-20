import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import getThemeColor from '../../utils/getThemeColor';

/* Components */
import { Avatar } from '../';

/* Styled Components */
import {
    ProfileWrapper,
    ProfileLink,
    ProfileAuthor,
    ProfilePosition,
    ProfileDescription,
} from './styles';

function Profile() {
    const {
        site: {
            siteMetadata: { title, position, company, description },
        },
    } = useStaticQuery(graphql`
        query MySiteMetadata {
            site {
                siteMetadata {
                    title
                    position
                    company
                    description
                }
            }
        }
    `);

    return (
        <ProfileWrapper>
            <ProfileLink
                to="/"
                cover
                direction="left"
                bg={getThemeColor()}
                duration={0.6}
            >
                <Avatar />
                <ProfileAuthor>
                    {title}
                    <ProfilePosition>
                        {position}
                    </ProfilePosition>
                </ProfileAuthor>
            </ProfileLink>
            <ProfileDescription>
                {description} <span dangerouslySetInnerHTML={{ __html: company }} />.
            </ProfileDescription>
        </ProfileWrapper>
    );
}

export default Profile;
