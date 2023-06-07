import React from "react";

import useStyles from "./style";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faFileCircleCheck,
  faFileCirclePlus,
  faHomeAlt,
  faIdCardClip,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const NavSidbar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <Link className="link" to="/dashboard">
        <FontAwesomeIcon className="icon" icon={faHomeAlt} size="lg" />
        <span>Dashboard</span>
      </Link>
      <Link className="link" to="/dashboard/users">
        <FontAwesomeIcon className="icon" icon={faUsers} size="lg" />
        <span>Users</span>
      </Link>
      <Link className="link" to="/dashboard/providers">
        <FontAwesomeIcon className="icon" icon={faClipboard} size="lg" />
        <span>Providers</span>
      </Link>
      <Link className="link" to="/dashboard/add-provider">
        <FontAwesomeIcon className="icon" icon={faIdCardClip} size="lg" />
        <span>Add Provider</span>
      </Link>
      <Link className="link" to="/dashboard/categories">
        <FontAwesomeIcon className="icon" icon={faFileCircleCheck} size="lg" />
        <span>Categories</span>
      </Link>
      <Link className="link" to="/dashboard/add-category">
        <FontAwesomeIcon className="icon" icon={faFileCirclePlus} size="lg" />
        <span>Add Category</span>
      </Link>
    </div>
  );
};

export default NavSidbar;
