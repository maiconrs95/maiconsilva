import styled from 'styled-components';
import media from 'styled-media-query';
import AniLink from "gatsby-plugin-transition-link/AniLink";

const color = 'var(--texts)';

export const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    color: ${color};
`;

export const ProfileLink = styled(AniLink)`
    color: ${color};
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
        color: var(--highlight);
    }

    ${media.lessThan('large')`
        display: flex;
        text-align: left;
    `}
`;

export const ProfileAuthor = styled.h1`
    font-size: 1.6rem;
    margin: 0.5rem auto 1.5rem;

    ${media.lessThan('large')`
        font-size: 1.2rem;
        margin: 0;
    `}
`;

export const ProfilePosition = styled.small`
    display: block;
    font-size: 1.2rem;
    font-weight: 300;

     ${media.lessThan('large')`
        font-size: 0.8rem;
        margin-top: 0.2rem;
    `}
`;

export const ProfileDescription = styled.p`
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.4;

    ${media.lessThan('large')`
        display: none;
    `}
`;
