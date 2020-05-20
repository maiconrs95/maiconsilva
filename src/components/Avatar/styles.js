import styled from 'styled-components';
import media from 'styled-media-query';
import Img from 'gatsby-image';

export const AvatarWrapper = styled(Img)`
    border-radius: 50%;
    margin: auto;
    width: 3.75rem;
    height: 3.75rem;

    ${media.lessThan('large')`
        width: 1.875rem;
        height: 1.875rem;
    `};
`;
