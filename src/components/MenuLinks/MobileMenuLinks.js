import React, { useState } from 'react';
import links from './content';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import { Wrapper, MainMenu, MenuLinksLink } from './MobileMenuLinksStyled';

function MobileMenuLinks() {
    const [opened, setOpened] = useState(false);

    function handleMenu() {
        setOpened(!opened);
    }

    return (
        <Wrapper>
            <span className={`menuBtn ${opened ? 'act' : ''}`} onClick={handleMenu}>
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
                                onClick={handleMenu}
                                activeClassName="active"
                            >
                                {link.label}
                            </MenuLinksLink>
                        </li>
                    ))}
                </ul>
            </MainMenu>
        </Wrapper>
    );
}

export default MobileMenuLinks;
