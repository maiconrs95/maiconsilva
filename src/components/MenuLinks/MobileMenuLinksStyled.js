import styled from 'styled-components';
import media from 'styled-media-query';
import AniLink from "gatsby-plugin-transition-link/AniLink";

export const Wrapper = styled.section`
    display: none;

    ${media.lessThan('large')`
        display: initial;
    `}

.menuBtn {
    height: 30px;
    width: 30px;

    position: absolute;
    right: 2rem;
    top: 1rem;
    z-index: 101;

    > span {
        background-color: var(--texts);
        border-radius: 1px;
        height: 2px;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -1px 0 0 -15px;
        transition: height 100ms;

        &:after, &:before {
            content: '';
            background-color: var(--texts);
            border-radius: 1px;
            height: 2px;
            width: 100%;
            position: absolute;
            left: 50%;
            margin-left: -15px;
            transition: all 200ms;
        }

        &:after {
            top: -7px;
        }

        &:before {
            bottom: -7px;
        }
    }

    &.act {
        > span {
            height: 0;
                &:after, &:before {
                    background-color: var(--highlight);
                    top: 1px;
                }

                &:after {
                    transform: rotate(45deg);
                }

                &:before {
                    transform: rotate(-45deg);
                }
            }
        }
    }
`;

export const MainMenu = styled.nav`
    background-color: var(--mediumBackground);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
    display: table;
    text-align: center;
    opacity: 0;
    transition: all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: scale(0);

    &.act {
        opacity: 1;
        transform: scale(1);

        ul li {
            opacity: 1;
            transform: translateX(0);
        }
    }

    > ul {
        display: table-cell;
        vertical-align: middle;
    }

    li {
        padding: 15px 0;
        transition: all 400ms 510ms;
        opacity: 0;

        &:nth-child(odd) {
            transform: translateX(30%);
        }

        &:nth-child(even) {
            transform: translateX(-30%);
        }

        &:last-child {
            transform: none;
        }
    }

    a {
        color: var(--highlight);
        display: inline-block;
        font-size: 1.5rem;
    }
`;

export const MenuLinksLink = styled(AniLink)`
  	color: var(--texts);
    display: inline-block;

    &:hover {
        color: var(--highlight);
    }
`;
