import React from "react";

const FilterBar = ({ types, onTypeSelect }) => {
  return (
    <div className="filters">
      <select onChange={(e) => onTypeSelect(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
