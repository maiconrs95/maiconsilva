import React from 'react';
import PropTypes from 'prop-types';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import {
    PostItemWrapper,
    PostItemLink,
    PostItemTag,
    PostItemInfo,
    PostItemDate,
    PostItemTitle,
    PostItemDescription,
} from './PostItemStyled';

function PostItem({
    slug,
    background,
    category,
    date,
    timeToRead,
    title,
    description
}) {
    return (
        <PostItemLink
            to={slug}
            cover
            direction="right"
            bg={getThemeColor()}
            duration={0.6}
        >
            <PostItemWrapper>
                <PostItemTag background={background}>
                    {category}
                </PostItemTag>
                <PostItemInfo>
                    <PostItemDate>
                        {date} * {timeToRead} min de leitura
                    </PostItemDate>
                    <PostItemTitle>
                        {title}
                    </PostItemTitle>
                    <PostItemDescription>
                        {description}
                    </PostItemDescription>
                </PostItemInfo>
            </PostItemWrapper>
        </PostItemLink>
    );
}

PostItem.propTypes = {
    slug: PropTypes.string.isRequired,
    background: PropTypes.string,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    timeToRead: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

PostItem.defaultProps = {
    background: 'var(--highlight)'
}

export default PostItem;
