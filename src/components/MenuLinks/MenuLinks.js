import React from 'react';

import links from './content';
import {
    MenuLinksWrapper,
    MenuLinksList,
    MenuLinksItem,
    MenuLinksLink,
} from './MenuLinksStyled';

function MenuLinks() {
    return (
        <MenuLinksWrapper>
            <MenuLinksList>
                {links.map((link, i) => (
                    <MenuLinksItem key={i}>
                        <MenuLinksLink
                            to={link.url}
                            activeClassName="active"
                        >
                            {link.label}
                        </MenuLinksLink>
                    </MenuLinksItem>
                ))}
            </MenuLinksList>
        </MenuLinksWrapper>
    );
}

export default MenuLinks;
