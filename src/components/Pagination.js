import React, { useState } from 'react';

const Pagination = props => {
  const [pageValue, setPageValue] = useState(1);

  const handlePageInputChanges = e => {
    const newPageValue = e.target.value <= 0 ? 1 : e.target.value;

    setPageValue(newPageValue);
    props.pageChange(newPageValue);
  };

  const handlePageClick = e => {
    e.preventDefault();
    const newPageValue = e.target.dataset.page;

    setPageValue(newPageValue);
    props.pageChange(newPageValue);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.pageChange(pageValue);
  };

  const pages = () => {
    return Array(Math.ceil(props.totalPages / 10))
      .fill()
      .map((_, i) => i + 1);
  };

  return (
    <div className="pagination">
      <form className="pagination-form">
        <input
          value={pageValue}
          onChange={handlePageInputChanges}
          type="number"
        />
        <input onClick={callSearchFunction} type="submit" value="PAGE" />
      </form>

      {pages().map((value, index) => {
        return (
          <a
            style={
              Number(value) === Number(pageValue)
                ? {
                    textWeight: 'bold',
                    textDecoration: 'underline',
                    backgroundColor: '#ccc',
                  }
                : {}
            }
            className="page-entry"
            href={value}
            data-page={value}
            key={index}
            onClick={handlePageClick}
          >
            {value}
          </a>
        );
      })}
    </div>
  );
};

export default Pagination;
