import React, { useState } from "react";
import Helmet from "react-helmet";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Styles
import useStyles from "./style";
import { useAppDispatch } from "../../redux/hooks";
import { setAlert } from "../../redux/error/error-slice";
interface StateType {
  email: string;
  username: string;
  password: string;
  images: FileList | null;
}

const Payment: React.FC = () => {
  const classes = useStyles();

  const [post, setPost] = useState<StateType>({
    email: "",
    username: "",
    password: "",
    images: null,
  });
  const { email, username, password, images } = post || {};

  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({ ...post, images: e.target.files });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      dispatch(setAlert("Please fill all fields", "danger"));
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if (images)
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    console.log(formData);
  };
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Appointments`}</title>
      </Helmet>

      <div className={`${classes.page} text-center`}>
        <div className="card-shadow search-form">
          <h3 className="title">Payment</h3>
          <h6 className="subtitle">Proceed with payment</h6>

          <form onSubmit={onSubmit} className="search-form">
            <div className="col-3">
              <div className="input-group">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Username"
                  value={username}
                  onChange={onChange}
                  name="username"
                />
                <input
                  type="text"
                  className="input-text"
                  placeholder="Email"
                  value={email}
                  onChange={onChange}
                  name="email"
                />

                <input
                  type="text"
                  className="input-text"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  name="password"
                />

                <input
                  id="images"
                  className="input-text"
                  type="file"
                  name="images"
                  onChange={onChangeImages}
                  multiple
                />
                <label htmlFor="images" className="input-text">
                  Choose Images ({images ? images.length : 0})
                </label>

                <button type="submit" className="button-primary">
                  Pay Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
