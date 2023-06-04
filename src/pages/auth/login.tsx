import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/auth/auth-slice";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Components
import Spinner from "../../components/spinner";

import useStyles from "./style";

const Login: React.FC = () => {
  const { isAuthenticated, error, loading } = useAppSelector(
    state => state.auth
  );
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const [user, setUser] = useState({
    credential: "",
    password: "",
  });

  const { credential, password } = user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      //window.location.href = "/";
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "SET_ALERT", payload: error });
    }

    // eslint-disable-next-line
  }, [error]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (credential === "" || password === "") {
      dispatch({ type: "SET_ALERT", payload: "Please fill in all fields" });
    } else {
      dispatch(login({ credential, password }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Login`}</title>
      </Helmet>
      <div className={`${classes.root} card-shadow text-center`}>
        <h3 className="title">Login</h3>
        <h6 className="subtitle">{`Utilisez votre email, username ou bien le numéro de téléphone pour s'authentifier.`}</h6>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="input-text"
              type="text"
              name="credential"
              value={credential}
              placeholder="Username, Email or Phone"
              onChange={onChange}
              required
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
              required
            />
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <input
              type="submit"
              value="Login"
              className="button-primary mt-3"
            />
          )}
        </form>

        <p className="form-link mt-3">
          {`Je n'ai pas de compte?`}{" "}
          <Link to="/register">
            <span>Créer un compte</span>
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
