import React from 'react';
import propTypes from "prop-types";
import ReactGA from 'react-ga';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import { RecommendedWrapper, RecommendedLink } from './RecommendedStyled';

const RecommendedClickTrack = () => {
    ReactGA.event({
        category: 'menu link',
        action: 'click',
        label: 'Clicou num recommended link'
    })
};

function RecommendedPosts({ next, previous }) {

    return (
        <RecommendedWrapper>
            {previous && (
                <RecommendedLink
                    to={previous.fields.slug}
                    className="previous"
                    cover
                    direction="left"
                    bg={getThemeColor()}
                    duration={0.6}
                    onClick={() => RecommendedClickTrack()}
                >
                    {previous.frontmatter.title}
                </RecommendedLink>)
            }
            {next && (
                <RecommendedLink
                    to={next.fields.slug}
                    className="next"
                    cover
                    direction="right"
                    bg={getThemeColor()}
                    duration={0.6}
                    onClick={() => RecommendedClickTrack()}
                >
                    {next.frontmatter.title}
                </RecommendedLink>)
            }

        </RecommendedWrapper>
    );
}

/* Prop Types */
RecommendedPosts.propTypes = {
    next: propTypes.shape({
        frontmatter: propTypes.shape({
            title: propTypes.string.isRequired,
        }),
        fields: propTypes.shape({
            slug: propTypes.string.isRequired,
        }),
    }),
    previous: propTypes.shape({
        frontmatter: propTypes.shape({
            title: propTypes.string.isRequired,
        }),
        fields: propTypes.shape({
            slug: propTypes.string.isRequired,
        }),
    }),
}

export default RecommendedPosts;
