import React, { useState } from 'react';
import links from './content';
import ReactGA from 'react-ga';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import { SocialLinks } from '../';
import { Wrapper, MainMenu, MenuLinksLink } from './MobileMenuLinksStyled';

const menuLinkClickTrack = link => {
    ReactGA.event({
        category: 'menu link',
        action: 'click',
        label: `Menu Link - ${link}`
    })
};

function MobileMenuLinks() {
    const [opened, setOpened] = useState(false);

    function handleMenu(label) {
        setOpened(!opened);
        menuLinkClickTrack(label);
    }

    return (
        <Wrapper>
            <span role="button" tabIndex={0} className={`menuBtn ${opened ? 'act' : ''}`} onClick={handleMenu}>
                <span className="lines"></span>
            </span>
            <MainMenu className={`mainMenu ${opened ? 'act' : ''}`}>
                <ul>
                    {links.map((link, i) => (
                        <li key={i}>
                            <MenuLinksLink
                                to={link.url}
                                cover
                                direction="left"
                                bg={getThemeColor()}
                                duration={0.6}
                                onClick={() => handleMenu(link.label)}
                                activeClassName="active"
                            >
                                {link.label}
                            </MenuLinksLink>
                        </li>
                    ))}
                    <li>
                        <a
                            href={`/assets/pdf/Maicon Silva.pdf`}
                            download
                        >
                            Curriculum
                        </a>
                    </li>
                    <SocialLinks />
                </ul>
            </MainMenu>
        </Wrapper>
    );
}

export default MobileMenuLinks;
