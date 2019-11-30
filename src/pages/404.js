import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import SEO from "../components/seo";
import GlobalStyles from '../styles/global';

export const NotFound = styled.main`
    background: #000;
    min-height: 100vh;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        width: 300px;
        height: 300px;
    }

    a {
        font-size: 24px;
    }
`;

const NotFoundPage = () => (
    <>
        <GlobalStyles />
        <SEO title="404: Not found" />

        <NotFound>
            <img src="https://media.giphy.com/media/YyKPbc5OOTSQE/giphy.gif" alt="404" />
            <Link to="/">Go Home</Link>!
        </NotFound>
    </>
)

export default NotFoundPage
