import { useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";
import "../assets/css/Admin.css";

function Header({ OpenSidebar, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFilter(searchTerm);
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <form className="search-container" onSubmit={handleFormSubmit}>
          {/* <BsSearch className="search-icon" /> */}
          <input
            type="text"
            placeholder="Search by Phone number"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-submit-button">
            Search
          </button>
        </form>
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Header;
