
import './Pagination.scss';

const Pagination = ({ page, setPage, totalPages }) => {

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? 'active' : ''}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">

      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Назад
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
