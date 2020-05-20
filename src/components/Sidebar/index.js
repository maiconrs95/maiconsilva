import React from 'react';
import { Profile, SocialLinks, MenuLinks, MobileMenuLinks } from '../';

import { SidebarWrapper } from './styles';

function Sidebar({ children }) {
    return (
        <SidebarWrapper>
            <Profile />
            <SocialLinks hideMobile />
            <MenuLinks />
            <MobileMenuLinks />
        </SidebarWrapper>
    );
}

export default Sidebar;
