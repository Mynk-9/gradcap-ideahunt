import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Styles from './Pagination.module.scss';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [index, setIndex] = useState([]);

    const changePage = pageIndex => {
        setCurrentPage(pageIndex);
        onPageChange(pageIndex);
    };

    useEffect(() => {
        setIndex(() => {
            let _index = [];
            if (currentPage >= 3)
                _index = [currentPage - 2, currentPage - 1, currentPage];
            else if (currentPage === 2) _index = [1, 2];
            else _index = [1];

            if (totalPages - currentPage >= 2)
                _index = [..._index, currentPage + 1, currentPage + 2];
            else if (totalPages - currentPage === 1)
                _index.push(currentPage + 1);
            return _index;
        });
    }, [currentPage, totalPages]);

    return (
        <div className={Styles.pagination}>
            <button className={Styles.pageNumber} onClick={() => changePage(1)}>
                {'<<'}
            </button>
            {index.map(pageIndex => (
                <button
                    className={Styles.pageNumber}
                    onClick={() => changePage(pageIndex)}
                    key={pageIndex}
                    active={pageIndex === currentPage ? 'true' : 'false'}
                >
                    {pageIndex}
                </button>
            ))}
            <span className={Styles.dotDot}>{'...'}</span>
            <button
                className={`${Styles.pageNumber} ${Styles.nextPage}`}
                onClick={() =>
                    changePage(Math.min(currentPage + 1, totalPages))
                }
            >
                {'Next page'}
            </button>
            <button
                className={Styles.pageNumber}
                onClick={() => changePage(totalPages)}
            >
                {'>>'}
            </button>
        </div>
    );
};

Pagination.propTypes = {
    totalPages: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired,
};

export default Pagination;
