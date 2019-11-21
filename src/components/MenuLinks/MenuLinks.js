import React from 'react';
import links from './content';
import ReactGA from 'react-ga';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import { MenuLinksWrapper, MenuLinksList, MenuLinksItem, MenuLinksLink } from './MenuLinksStyled';

const menuLinkClickTrack = link => {
    ReactGA.event({
        category: 'menu link',
        action: 'click',
        label: `Menu Link - ${link}`
    })
};

function MenuLinks() {
    return (
        <MenuLinksWrapper>
            <MenuLinksList>
                {links.map((link, i) => (
                    <MenuLinksItem key={i}>
                        <MenuLinksLink
                            to={link.url}
                            cover
                            direction="left"
                            bg={getThemeColor()}
                            duration={0.6}
                            activeClassName="active"
                            onClick={() => menuLinkClickTrack(link.label)}
                        >
                            {link.label}
                        </MenuLinksLink>
                    </MenuLinksItem>
                ))}
                <MenuLinksItem>
                    <a
                        href={`/assets/pdf/Maicon Silva.pdf`}
                        download
                    >
                        Curriculum
                    </a>
                </MenuLinksItem>
            </MenuLinksList>
        </MenuLinksWrapper>
    );
}

export default MenuLinks;
