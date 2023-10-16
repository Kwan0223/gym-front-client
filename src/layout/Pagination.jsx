import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
    const pages = [...Array(totalPage).keys()].map(i => i + 1);

    return (
        <div className="pagination">
            {pages.map(page => (
                <span
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
