import React from 'react';
import { Profile, SocialLinks } from '../';
import { SidebarWrapper } from './SidebarStyled';

function Sidebar({ children }) {
    return (
        <SidebarWrapper>
            <Profile />
            <SocialLinks />
        </SidebarWrapper>
    );
}

export default Sidebar;
