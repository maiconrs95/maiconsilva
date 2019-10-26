import React from "react";
import PropTypes from "prop-types";

/* Global Styles */
import GlobalStyles from '../../styles/global';

/* Layout Components */
import { Sidebar, MenuBar } from '../';

/* Styled Components */
import { LayoutWrapper, LayoutMain } from './LayoutStyled';

const Layout = ({ children }) => {
  return (
        <LayoutWrapper>
            <GlobalStyles />
            <Sidebar />
            <LayoutMain>{children}</LayoutMain>
            <MenuBar />
        </LayoutWrapper>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
