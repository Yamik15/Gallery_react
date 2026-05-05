const Pagination = () => {
  return (
    <footer className="pagination">
      <div className="pagination-arrow left">
        <img src="/assets/icons/Arrow right_lightgray_2.svg" alt="Предыдущая" className="theme-icon" />
      </div>
      <div className="pagination-numbers">
        <span className="pagination-number active">1</span>
        <span className="pagination-number">2</span>
        <span className="pagination-number">3</span>
        <span className="pagination-dots">...</span>
        <span className="pagination-number">9</span>
      </div>
      <div className="pagination-arrow right">
        <img src="/assets/icons/Arrow right_lightgray_2.svg" alt="Следующая" className="theme-icon" />
      </div>
    </footer>
  );
};

export default Pagination;