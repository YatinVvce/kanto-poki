import React from "react";

const Pagination = ({ onNext, onPrevious }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Pagination;
