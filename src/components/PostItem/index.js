import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import getThemeColor from '../../utils/getThemeColor';

import {
    PostItemWrapper,
    PostItemLink,
    PostItemTag,
    PostItemInfo,
    PostItemDate,
    PostItemTitle,
    PostItemDescription,
} from './styles';

const menuLinkClickTrack = slug => {
    ReactGA.event({
        category: 'post item',
        action: 'click',
        label: `Post Item - ${slug}`,
    });
};

function PostItem({
    slug,
    background,
    category,
    date,
    timeToRead,
    title,
    description,
}) {
    return (
        <PostItemLink
            to={slug}
            cover
            direction="right"
            bg={getThemeColor()}
            duration={0.6}
            onClick={() => menuLinkClickTrack(slug)}
        >
            <PostItemWrapper>
                <PostItemTag className="post-tag" background={background}>
                    {category}
                </PostItemTag>
                <PostItemInfo>
                    <PostItemDate>
                        {`${date} * ${timeToRead} min de leitura`}
                    </PostItemDate>
                    <PostItemTitle>{title}</PostItemTitle>
                    <PostItemDescription>{description}</PostItemDescription>
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
    timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

PostItem.defaultProps = {
    background: 'var(--highlight)',
};

export default PostItem;
