import React from 'react';

import { Layout, Search } from "../components";
import SEO from "../components/seo";

function SearchPage() {
    return (
        <Layout>
            <SEO title="Search" />
            <Search />
        </Layout>
    );
};

export default SearchPage;
