import React from "react";
import { TransitionPortal } from "gatsby-plugin-transition-link";
import PropTypes from "prop-types";

/* Global Styles */
import GlobalStyles from '../../styles/global';

/* Layout Components */
import { Sidebar, MenuBar } from '../';

/* Styled Components */
import { LayoutWrapper, LayoutMain } from './styles';

const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <GlobalStyles />
            <TransitionPortal level="top">
                <Sidebar />
            </TransitionPortal>
            <LayoutMain>{children}</LayoutMain>
            <TransitionPortal level="top">
                <MenuBar />
            </TransitionPortal>
        </LayoutWrapper>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
