import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilter = () => {
    onFilter(filterValue);
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
      <input
        type="text"
        placeholder="Filter by date or phone number"
        value={filterValue}
        onChange={handleInputChange}
        className="form-control w-100  mr-2 m"
      />
      <button className="btn btn-lg btn-primary" onClick={handleFilter}>
        Filter
      </button>
    </div>
  );
};

export default FilterComponent;
