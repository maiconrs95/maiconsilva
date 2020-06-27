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
                <p>Maicon, 24 anos, São Paulo - Brasil.</p>

                <p>
                    Desenvolvedor web com foco em entregar produtos de alta
                    qualidade.
                </p>

                <p>
                    Gosto de trabalhar em equipe e em projetos desafiadores,
                    pois isso me dá a oportunidade de estar em constante
                    evolução.
                </p>

                <p>
                    Trabalhar ideias, desenvolver produtos e escrever código faz
                    parte da minha rotina, por isso eu sempre busco as melhores
                    práticas para resolver problemas utilizando tecnologia.
                </p>

                <p>
                    Atualmente escrevo aqui no meu blog como forma de documentar
                    o que aprendo, e também como um meio de compartilhar
                    conhecimento.
                </p>

                <p>
                    Trabalho como desenvolvedor web a mais ou menos 3 anos, e
                    nesse período estive presente em projetos como websites,
                    sistemas de gestão, sac, agendamento, backoffice, backstages
                    etc.
                </p>

                <p>
                    Também trabalhei em projetos para o Burger King, Leroy
                    Merlin, Essilor, Mamy Poko e atualmente trabalho para a
                    Ingresse.
                </p>

                <h2>Skills</h2>

                <ul>
                    <li>HTML</li>
                    <li>CSS (Stylus, Sass, Less, PostCSS)</li>
                    <li>CSS Frameworks</li>
                    <li>Design Responsivo (Mobile First)</li>
                    <li>JavaScript (Design Patterns, ES6/7+)</li>
                    <li>TypeScript</li>
                    <li>
                        ReactJS / React Native / Hooks / Redux / Flux / Context
                        API / CSS-in-JS
                    </li>
                    <li>NodeJS</li>
                    <li>Git</li>
                    <li>MySQL - MongoDB</li>
                    <li>SCRUM</li>
                </ul>

                <h2>Contato</h2>

                <p>
                    Você pode entrar em contato comigo através de qualquer uma
                    das minhas redes sociais.
                </p>

                <SocialLinks />
            </MainContent>
        </Layout>
    );
}

export default AboutPage;
