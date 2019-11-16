import React, { useState, useEffect } from 'react';
import { Home } from 'styled-icons/boxicons-solid/Home';
import { Search } from 'styled-icons/boxicons-regular/Search';
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt';
import { Lightbulb as Light } from 'styled-icons/remix-line/Lightbulb';
import { Grid } from 'styled-icons/boxicons-solid/Grid';
import { ThList as List } from 'styled-icons/typicons/ThList';

/* Styled Components */
import { MenuBarWrapper, MenuBarGroup, MenuBarLink, MenuBarItem } from './MenuBarStyled';

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
                <MenuBarLink to="/" title="Voltar para Home">
                    <MenuBarItem>
                        <Home />
                    </MenuBarItem>
                </MenuBarLink>
                <MenuBarLink to="/search/" title="Pesquisar">
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
                        window.__setPreferredTheme(isDarkMode ? 'light' : 'dark');
                    }}>
                    <Light />
                </MenuBarItem>
                <MenuBarItem
                    title="Mudar visualização"
                    className="display"
                    onClick={() => {
                        window.__setPreferredDisplay(isListMode ? 'grid' : 'list');
                    }}
                >
                    {isListMode ? <Grid /> : <List />}
                </MenuBarItem>
                <MenuBarItem title="Ir para o topo">
                    <Arrow />
                </MenuBarItem>
            </MenuBarGroup>
        </MenuBarWrapper>
    );
}

export default MenuBar;
