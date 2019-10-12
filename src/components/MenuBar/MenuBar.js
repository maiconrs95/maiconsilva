import React from 'react';

import { Home } from 'styled-icons/boxicons-solid/Home';
import { Search } from 'styled-icons/boxicons-regular/Search';
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt';
import { Lightbulb as Light } from 'styled-icons/remix-line/Lightbulb';
import { Grid } from 'styled-icons/boxicons-solid/Grid';


import {
    MenuBarWrapper,
    MenuBarGroup,
    MenuBarLink,
    MenuBarItem,
} from './MenuBarStyled';

function MenuBar() {
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
                <MenuBarItem title="Mudar o tema">
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
