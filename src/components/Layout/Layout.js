import React from "react";
import PropTypes from "prop-types";

/* Global Styles */
import GlobalStyles from '../../styles/global';

/* Styled Components */
import { LayoutWrapper, LayoutMain } from './LayoutStyled';

/* Global pages components */
import { Profile } from '../';

const Layout = ({ children }) => {
  return (
        <LayoutWrapper>
            <aside>
                <Profile />
            </aside>
            <LayoutMain>{children}</LayoutMain>
            <GlobalStyles />
        </LayoutWrapper>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
