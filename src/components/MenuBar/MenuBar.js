import React, { useState, useEffect } from 'react';
import { Home } from 'styled-icons/boxicons-solid/Home';
import { Search } from 'styled-icons/boxicons-regular/Search';
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt';
import { Lightbulb as Light } from 'styled-icons/remix-line/Lightbulb';
import { Grid } from 'styled-icons/boxicons-solid/Grid';

/* Styled Components */
import { MenuBarWrapper, MenuBarGroup, MenuBarLink, MenuBarItem } from './MenuBarStyled';

function MenuBar() {
    const [theme, setTheme] = useState(null);

    const isDarkMode = theme === 'dark';

    /**
     * Changes Theme
     */
    useEffect(() => {
        setTheme(window.__theme);
        window.__onThemeChange = () => setTheme(window.__theme);
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
                <MenuBarItem title="Mudar visualização">
                    <Grid />
                </MenuBarItem>
                <MenuBarItem title="Ir para o topo">
                    <Arrow />
                </MenuBarItem>
            </MenuBarGroup>
        </MenuBarWrapper>
    );
}

export default MenuBar;
