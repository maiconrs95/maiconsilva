import React from 'react';
import { Profile, SocialLinks, MenuLinks, MobileMenuLinks } from '../';
import { SidebarWrapper } from './SidebarStyled';

function Sidebar({ children }) {
    return (
        <SidebarWrapper>
            <Profile />
            <SocialLinks />
            <MenuLinks />
            <MobileMenuLinks />
        </SidebarWrapper>
    );
}

export default Sidebar;
