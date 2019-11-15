import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid var(--borders);
    background-color: var(--mediumBackground);
    height: 100vh;
    position: fixed;
    padding: 2rem;
    text-align: center;
    width: 20rem;
`;
