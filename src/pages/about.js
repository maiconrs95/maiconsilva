import React from 'react';

import { Layout, SocialLinks } from "../components";
import SEO from "../components/seo";

import { MainContent } from '../styles/base'

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
                    Meu nome é Maicon Rocha da Silva, 24, nasci em São Paulo/SP e
                    atualmente sou Frontend Developer na{' '}
                    <a href="https://ingresse.com" target="_blank" rel="noopener noreferrer">
                        Ingresse
                    </a>
                    .
                </p>

                <p>
                    Cursei Análise e Desenvolvimento de Sistemas na Universidade Mogi das Cruzes entre 2016 - 2018.
                </p>

                <p>
                    Escolhi a área de tecnologia, pois sempre me identifiquei. E quanto mais eu aprendo sobre essa área, mais
                    feliz eu fico com a escolha que fiz.
                </p>

                <h2>Habilidades</h2>

                <ul>
                    <li>HTML</li>
                    <li>CSS (Stylus, Sass, Less, PostCSS)</li>
                    <li>Javascript (Design Patterns, ES6/7+)</li>
                    <li>Design Responsivo (Mobile First)</li>
                    <li>Css Frameworks</li>
                    <li>ReactJS / Redux / Flux</li>
                    <li>NodeJS</li>
                    <li>Git</li>
                    <li>MySQL - MongoDB</li>
                    <li>Scrum</li>
                    <li>E o que não estiver na lista, dou um jeito de aprender!</li>
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
