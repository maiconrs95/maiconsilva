import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import PropTypes from 'prop-types';

import getThemeColor from '../../utils/getThemeColor';

/* Styled Components */
import { PaginationWrapper } from './PaginationStyled';

function Pagination({
    isFirst,
    isLast,
    currentPage,
    numPages,
    prevPage,
    nextPage,
}) {

    return (
        <PaginationWrapper>
            {!isFirst && <AniLink to={prevPage} cover direction="left" bg={getThemeColor()} duration={0.6}>&#8592; página anterior</AniLink>}
            <p>
                {currentPage} de {numPages}
            </p>
            {!isLast && <AniLink to={nextPage} cover direction="right" bg={getThemeColor()} duration={0.6}>proxima página &#8594;</AniLink>}
        </PaginationWrapper>
    );
}

/* prop Types */
Pagination.propTypes = {
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    prevPage: PropTypes.string,
    nextPage: PropTypes.string,
};

export default Pagination;
