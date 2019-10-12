import React from "react";

import { Layout, PostItem } from "../components";
import SEO from "../components/seo";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <PostItem
            slug="/about/"
            category="JS"
            date="30 de Julho de 2019"
            timeToRead=""
            title="Diga não ao Medium: tenha sua própria plataforma"
            description="Algumas razões para você ter sua própria plataforma ao invés de soluções terceiras"
        />
    </Layout>
);

export default IndexPage
