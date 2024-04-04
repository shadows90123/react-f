import { useEffect, useState } from "react";

export default function Pagination({
    _currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(_currentPage);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={`page-item ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    <button className="page-link">{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    useEffect(() => {
        setCurrentPage(_currentPage);
        renderPageNumbers();
    }, [_currentPage]);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li
                    className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        ก่อนหน้า
                    </button>
                </li>
                {renderPageNumbers()}
                <li
                    className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        ถัดไป
                    </button>
                </li>
            </ul>
        </nav>
    );
}
