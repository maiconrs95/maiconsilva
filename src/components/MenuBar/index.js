import React, { useState, useEffect } from 'react';
import { Home } from 'styled-icons/boxicons-solid/Home';
import { Search } from 'styled-icons/boxicons-regular/Search';
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt';
import { Sun } from 'styled-icons/boxicons-solid/Sun';
import { Grid } from 'styled-icons/boxicons-solid/Grid';
import { ThList as List } from 'styled-icons/typicons/ThList';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import {
    MenuBarWrapper,
    MenuBarGroup,
    MenuBarLink,
    MenuBarItem,
} from './styles';

function MenuBar() {
    const [theme, setTheme] = useState(null);
    const [display, setDisplay] = useState(null);

    const isDarkMode = theme === 'dark';
    const isListMode = display === 'list';

    /**
     * Changes Theme
     */
    useEffect(() => {
        setTheme(window.__theme);
        setDisplay(window.__display);

        window.__onThemeChange = () => setTheme(window.__theme);
        window.__onDisplayChange = () => setDisplay(window.__display);
    }, []);

    return (
        <MenuBarWrapper>
            <MenuBarGroup>
                <MenuBarLink
                    to="/"
                    title="Voltar para Home"
                    cover
                    direction="right"
                    activeClassName="active"
                    bg={getThemeColor()}
                    duration={0.6}
                >
                    <MenuBarItem>
                        <Home />
                    </MenuBarItem>
                </MenuBarLink>
                <MenuBarLink
                    to="/search/"
                    title="Pesquisar"
                    cover
                    direction="right"
                    activeClassName="active"
                    bg={getThemeColor()}
                    duration={0.6}
                >
                    <MenuBarItem>
                        <Search />
                    </MenuBarItem>
                </MenuBarLink>
            </MenuBarGroup>

            <MenuBarGroup>
                <MenuBarItem
                    title="Mudar o tema"
                    className={theme}
                    onClick={() => {
                        window.__setPreferredTheme(
                            isDarkMode ? 'light' : 'dark',
                        );
                    }}
                >
                    <Sun />
                </MenuBarItem>
                {/* <MenuBarItem
                    title="Mudar visualização"
                    className="display"
                    onClick={() => {
                        window.__setPreferredDisplay(isListMode ? 'grid' : 'list');
                    }}
                >
                    {isListMode ? <Grid /> : <List />}
                </MenuBarItem> */}
                <MenuBarItem
                    title="Ir para o topo"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <Arrow />
                </MenuBarItem>
            </MenuBarGroup>
        </MenuBarWrapper>
    );
}

export default MenuBar;
