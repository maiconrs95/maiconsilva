import styled from 'styled-components';
import media from 'styled-media-query';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export const PostItemWrapper = styled.section`
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 2rem 3rem;
    flex-direction: column;
    justify-content: flex-start;

    ${media.lessThan('large')`
        padding: 2rem 1rem;
    `}
`;

export const PostItemLink = styled(AniLink)`
    color: var(--texts);
    display: flex;
    text-decoration: none;

    body#grid & {
        background-color: var(--background);
    }

    &:hover {
        color: var(--highlight);
    }
`;

export const PostItemTag = styled.div`
    display: flex;
    align-items: center;
    background: ${(props) => props.background};
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    min-height: auto;
    min-width: auto;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    margin-bottom: 1.5rem;

    ${media.lessThan('small')`
        margin-bottom: 1rem;
        font-size: 0.9rem;
    `}
`;

export const PostItemInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PostItemDate = styled.time`
    font-size: 0.9rem;
`;

export const PostItemTitle = styled.h1`
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0.2rem 0 0.5rem;

    body#grid & {
        line-height: 1.1;
        margin: 0.5rem 0;

        ${media.lessThan('small')`
            font-size: 1.3rem;
        `}
    }
`;

export const PostItemDescription = styled.p`
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.2;
`;
