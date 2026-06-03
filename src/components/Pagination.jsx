const Pagination = ({ currentPage, totalPages, onPageChange: onPageChange }) => {
  // Массив номеров страниц
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <footer className="pagination">
      <div className={`pagination-arrow left ${currentPage === 1 ? "disabled" : ""}`} onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
        <img src="/assets/icons/Arrow right_lightgray_2.svg" alt="Предыдущая" className="theme-icon" />
      </div>
      <div className="pagination-numbers">
        {pages.map(page => (
          <span key={page} className={`pagination-number ${currentPage === page ? "active" : ""}`} onClick={() => onPageChange(page)}>
            {page}
          </span>
        ))}
      </div>
      <div className={`pagination-arrow right ${currentPage === totalPages ? "disabled" : ""}`} onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
        <img src="/assets/icons/Arrow right_lightgray_2.svg" alt="Следующая" className="theme-icon" />
      </div>
    </footer>
  );
};

export default Pagination;