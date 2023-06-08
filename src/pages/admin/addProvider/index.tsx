import React, { useEffect } from "react";
import useStyles from "./style";
import { AddProviderSchema } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addProvider, getCategories } from "../../../redux/admin/admin-slice";
import { setAlert } from "../../../redux/error/error-slice";
const AddProvider: React.FC = () => {
  const classes = useStyles();
  const [provider, setProvider] = React.useState<AddProviderSchema>({
    username: "",
    password: "",
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    categoryTitle: "Entretien Campus France",
  });

  const {
    username,
    password,
    email,
    phone,
    firstname,
    lastname,
    categoryTitle,
  } = provider;

  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.admin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProvider({ ...provider, [e.target.name]: e.target.value });

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setProvider({ ...provider, categoryTitle: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      dispatch(setAlert("Username is required", "danger"));
      return;
    }
    if (email === "") {
      dispatch(setAlert("Email is required", "danger"));
      return;
    }
    dispatch(addProvider(provider));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <>
      <div className={classes.page}>
        <h4>Add Provider</h4>
        <div className="content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={username}
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={phone}
                placeholder="Phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={handleChange}
                value={firstname}
                placeholder="Firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={handleChange}
                value={lastname}
                placeholder="Lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="categoryTitle"
                id="categoryTitle"
                onChange={handleChangeSelect}
                value={categoryTitle}
              >
                {categories.map(category => (
                  <option key={category.categoryId} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-btn">
              <button type="submit">Add Provider</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProvider;
