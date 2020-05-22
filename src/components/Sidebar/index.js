import React from 'react';
import { Profile, SocialLinks, MenuLinks, MobileMenuLinks } from '../';

import { SidebarWrapper } from './styles';

function Sidebar({ children }) {
    return (
        <SidebarWrapper>
            <Profile />
            <MenuLinks />
            <MobileMenuLinks />
            <SocialLinks hideMobile />
        </SidebarWrapper>
    );
}

export default Sidebar;
