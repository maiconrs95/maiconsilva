import React from 'react';
import { Profile, SocialLinks, MenuLinks } from '../';
import { SidebarWrapper } from './SidebarStyled';

function Sidebar({ children }) {
    return (
        <SidebarWrapper>
            <Profile />
            <SocialLinks />
            <MenuLinks />
        </SidebarWrapper>
    );
}

export default Sidebar;
