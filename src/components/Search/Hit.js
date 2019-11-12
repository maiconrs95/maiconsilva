import React from 'react';
import { PostItem } from '../';

function Hit({ hit }) {
    const { slug } = hit.fields;
    const { title, date, background, description, category } = hit;

    return (
        <PostItem
            slug={slug}
            title={title}
            date={date}
            background={background}
            description={description}
            category={category}
        />
    );
}

export default Hit;
