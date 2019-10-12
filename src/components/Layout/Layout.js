import React from "react";
import PropTypes from "prop-types";

/* Global Styles */
import GlobalStyles from '../../styles/global';

/* Styled Components */
import { LayoutWrapper, LayoutMain } from './LayoutStyled';

/* Global pages components */
import { Sidebar } from '../';

const Layout = ({ children }) => {
  return (
        <LayoutWrapper>
            <Sidebar />
            <LayoutMain>{children}</LayoutMain>
            <GlobalStyles />
        </LayoutWrapper>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
