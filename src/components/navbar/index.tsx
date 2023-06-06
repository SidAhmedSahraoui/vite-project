import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLines,
  faSignOutAlt,
  faEnvelope,
  faUser,
  faCheck,
  faUsers,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

// Actions
import { loadUser, logout } from "../../redux/auth/auth-slice";
//import { setAlert } from "../../redux/error/error-slice";

// Logo
import Logo from "../../assets/images/logo.svg";
// Styles
import useStyles from "./navbar";
// Types
import { Role } from "../../types";

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (localStorage.token && localStorage.userId) {
      dispatch(loadUser());
    }
  }, [isAuthenticated]);
  const userMenu = (
    <>
      <li className="dropdown">
        <a
          href="#user"
          className="nav-link dropdown-toggle user-menu"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>{user && user.username}</strong>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          {/* Admin Menu */}
          {user &&
          user.roles.some((role: Role) => role.roleName === "ADMIN") ? (
            <>
              <Link className="dropdown-item" to="/pending">
                <FontAwesomeIcon className="icon mr-2" icon={faCheck} />
                Admin Dashboard
              </Link>
              <Link className="dropdown-item" to="/users">
                <FontAwesomeIcon className="icon mr-2" icon={faUsers} />
                Manage Users
              </Link>
              <div className="dropdown-divider"></div>
            </>
          ) : user &&
            user.roles.some((role: Role) => role.roleName === "PROVIDER") ? (
            <>
              <Link className="dropdown-item" to="/planning">
                <FontAwesomeIcon className="icon mr-2" icon={faCheck} />
                My planning
              </Link>
              <Link className="dropdown-item" to="/appointments">
                <FontAwesomeIcon className="icon mr-2" icon={faCalendarAlt} />
                My appointments
              </Link>
              <div className="dropdown-divider"></div>
            </>
          ) : null}
          <Link className="dropdown-item" to="/profile">
            <FontAwesomeIcon className="icon mr-2" icon={faUser} />
            Profile
          </Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={onLogout} href="#logout">
            <FontAwesomeIcon className="icon mr-2" icon={faSignOutAlt} />
            Sign out
          </a>
        </div>
      </li>

      <li className="message nav-item">
        <Link className="nav-link link-primary my-sm-0" to="/messages">
          <FontAwesomeIcon
            className="icon d-none d-lg-inline align-middle"
            icon={faEnvelope}
          />
          <span className="d-inline d-lg-none">Messages</span>
        </Link>
      </li>
    </>
  );

  const guestMenu = (
    <>
      <li className="nav-item">
        <Link className="nav-link link-primary my-sm-0 mr-2" to="/login">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link button-primary my-sm-0" to="/register">
          Register
        </Link>
      </li>
    </>
  );

  const [toggleStatus, setToggleStatus] = useState("closed");

  const classes = useStyles();

  const handleToggle = () => {
    toggleStatus === "closed"
      ? setToggleStatus("opened")
      : setToggleStatus("closed");
  };

  return (
    <nav
      className={`${classes.navbar} navbar navbar-expand-lg navbar-light bg-white`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={Logo} alt="Dirlkhir" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <FontAwesomeIcon
            /*style={
              toggleStatus !== "closed" && {
                transformOrigin: "center",
                transform: "rotate(90deg)",
              }
            }*/
            icon={faGripLines}
          />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/interviews">
                    Interviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    A propos
                  </Link>
                </li>
              </>
            ) : user &&
              user.roles.some((role: Role) => role.roleName === "ADMIN") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </>
            ) : user &&
              user.roles.some((role: Role) => role.roleName === "PROVIDER") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/planning">
                    Planning
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments">
                    My Appointments
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/interviews">
                    Interviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments/client">
                    My Appointments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    A propos
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Check if logged in */}
          <ul className="navbar-nav">
            {isAuthenticated ? userMenu : guestMenu}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
