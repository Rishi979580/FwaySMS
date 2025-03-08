import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsFillGearFill,
  BsFront,
} from "react-icons/bs";
import { Badge } from "react-bootstrap";
import { BiMailSend, BiWindowClose } from "react-icons/bi";
import Logout from "../../auth/components/logout/LogoutComponent";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ paddingBottom: "40px" }}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <Badge className="icon_header" /> Admin Panel{" "}
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <BiWindowClose /> {/* Close icon */}
        </span>
      </div>

      <ul className="sidebar-list text-dark">
        <li className="sidebar-list-item">
          <Link
            to="/admin/dashboard"
            className="nav-link bg-warning text-white"
          >
            <BsGrid1X2Fill className="icon " /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/enquiry" className="nav-link">
            <BsPeopleFill className="icon" /> Enquiry
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/sms-order" className="nav-link">
            <BsPeopleFill className="icon" /> SMS Order
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/update" className="nav-link">
            <BsFront className="icon" />
            Update
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/settings" className="nav-link">
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>

        <Logout />
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
