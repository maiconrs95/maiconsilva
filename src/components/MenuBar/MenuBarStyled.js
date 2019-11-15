import styled from 'styled-components';
import { Link } from 'gatsby';

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
`;

export const MenuBarGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MenuBarLink = styled(Link)`
    display: block;
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
        color: #d4d400;

        &:hover {
            color: #e2e240;
        }
    }

    &:hover {
        color: var(--highlight);
    }
`;
