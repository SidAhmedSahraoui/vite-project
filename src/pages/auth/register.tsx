import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { register } from "../../redux/auth/auth-slice";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Components
import Spinner from "../../components/spinner";

import useStyles from "./style";
import { setAlert } from "../../redux/error/error-slice";

const Register: React.FC = () => {
  const { isAuthenticated, error, loading } = useAppSelector(
    state => state.auth
  );
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: "",
  });

  const { username, phone, email, password, password2, firstname, lastname } =
    user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
  }, [error]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "" || phone === "" || email === "" || password === "") {
      dispatch(setAlert("Please fill in all fields", "danger"));
    } else if (password.length < 6) {
      dispatch(setAlert("Password must be at least 6 characters", "danger"));
    } else if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      // Register function
      dispatch(
        register({ username, phone, email, password, firstname, lastname })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Register`}</title>
      </Helmet>
      <div className={`${classes.root} card-shadow text-center`}>
        <h3 className="title">Creer un compte</h3>
        <h6 className="subtitle">{`Veuillez remplir ces informations correctement.`}</h6>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="input-text"
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={onChange}
              // required
            />
          </div>
          <div className="form-group">
            <input
              className="input-text"
              type="text"
              name="firstname"
              value={firstname}
              placeholder="First Name"
              onChange={onChange}
              // required
            />
          </div>
          <div className="form-group">
            <input
              className="input-text"
              type="text"
              name="lastname"
              value={lastname}
              placeholder="Last Name"
              onChange={onChange}
              // required
            />
          </div>

          <div className="form-group">
            <input
              className="input-text"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
              // required
            />
          </div>

          <div className="form-group">
            <input
              className="input-text"
              type="text"
              name="phone"
              value={phone}
              placeholder="Phone"
              onChange={onChange}
              // required
            />
          </div>

          <div className="form-group">
            <input
              className="input-text"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              // required
            />
          </div>

          <div className="form-group">
            <input
              className="input-text"
              type="password"
              name="password2"
              value={password2}
              placeholder="Password confirmation"
              onChange={onChange}
              // required
            />
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <input
              type="submit"
              value="Create Account"
              className="button-primary mt-3"
            />
          )}
        </form>

        <p className="form-link mt-3">
          {`J'ai déjà un compte`}{" "}
          <Link to="/login">
            <span>Log in</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
