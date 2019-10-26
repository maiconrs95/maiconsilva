import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

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
            {!isFirst && <Link to={prevPage}>&#8592; página anterior</Link>}
            <p>
               {currentPage} de {numPages}
            </p>
            {!isLast && <Link to={nextPage}>proxima página &#8594;</Link>}
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
