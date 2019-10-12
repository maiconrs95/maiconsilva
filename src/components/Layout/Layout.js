import React from "react";
import PropTypes from "prop-types";

/* Global Styles */
import GlobalStyles from '../../styles/global';

/* Styled Components */
import { LayoutWrapper, LayoutMain } from './LayoutStyled';

/* Global pages components */
import { Sidebar } from '../';
import MenuBar from '../MenuBar/MenuBar';

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
