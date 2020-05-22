import styled from 'styled-components';
import media from "styled-media-query";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export const MenuBarWrapper = styled.aside`
    display: flex;
    align-items: center;
    background-color: var(--mediumBackground);
    border-left: 1px solid var(--borders);
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    padding: 0.8rem 0;
    position: fixed;
    right: 0;
    width: 3.75rem;
    transition: background 0.5s;

    ${media.lessThan("large")`
        border-top: 1px solid var(--borders);
        bottom: 0;
        flex-direction: row;
        height: auto;
        padding: 0;
        position: fixed;
        width: 100%;
    `}
`;

export const MenuBarGroup = styled.div`
    display: flex;
    flex-direction: column;

    ${media.lessThan("large")`
        flex-direction: row;
    `}
`;

export const MenuBarLink = styled(AniLink)`
    display: block;

    &.active {
        span {
            color: var(--highlight);
        }
    }
`;

export const MenuBarItem = styled.span`
    color: var(--texts);
    cursor: pointer;
    display: block;
    padding: 1.1rem;
    position: relative;
    width: 3.75rem;
    height: 3.75rem;

    &.light {
        color: #F7C21C;

        &:hover {
            color: #F7C21C;
        }
    }

    &:hover {
        color: var(--highlight);
    }

    &.display {
        ${media.lessThan("large")`
            display: none;
        `}
    }

    ${media.greaterThan("large")`
        &:hover {
            color: var(--highlight);
        }
    `}

    ${media.lessThan("large")`
        height: 3.2rem;
        padding: .9rem;
        position: relative;
        width: 3.2rem;
    `}
`;