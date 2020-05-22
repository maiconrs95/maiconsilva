import React from 'react';

import { Layout, SocialLinks } from '../components';
import SEO from '../components/seo';

import { MainContent } from '../styles/base';


function AboutPage() {
    return (
        <Layout>
            <SEO
                title="Sobre mim"
                description="Saiba um pouco mais sobre o desenvolvedor por trás deste blog."
            />

            <MainContent>
                <h1>Sobre mim</h1>
                <p>
                    Eu sou Maicon, 24, from Brazil/SP e desenvolvedor web.

                    Criei esse blog a fim de documentar e compartilhar tudo o que eu aprendo.
                </p>

                <p>
                    Me formei em Análise e Desenvolvimento de Sistemas na UMC, em 2018.
                </p>

                <p>
                    Escolhi o desenvolvimento pelo "poder da criação" e quanto mais eu procuro aprender sobre essa área, mais apaixonado
                    eu fico.
                </p>

                <h2>Habilidades</h2>

                <ul>
                    <li>HTML</li>
                    <li>CSS (Stylus, Sass, Less, PostCSS)</li>
                    <li>JavaScript (Design Patterns, ES6/7+)</li>
                    <li>Design Responsivo (Mobile First)</li>
                    <li>Css Frameworks</li>
                    <li>ReactJS / React Native / Redux / Flux</li>
                    <li>NodeJS</li>
                    <li>Git</li>
                    <li>MySQL - MongoDB</li>
                    <li>Scrum</li>
                </ul>

                <h2>Contato</h2>

                <p>
                    Você pode entrar em contato comigo através de qualquer uma das minhas redes sociais.
                </p>

                <SocialLinks />
            </MainContent>
        </Layout>
    );
}

export default AboutPage;
