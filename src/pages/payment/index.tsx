import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Styles
import useStyles from "./style";
import { useAppDispatch } from "../../redux/hooks";
import { setAlert } from "../../redux/error/error-slice";
import { useParams } from "react-router-dom";
import { payment } from "../../redux/planning/planning-slice";

interface StateType {
  email: string;
  username: string;
  appointmentId: number | null;
  file: FileList | null;
}

const Payment: React.FC = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [post, setPost] = useState<StateType>({
    email: "",
    username: "",
    appointmentId: null,
    file: null,
  });
  const { email, username, appointmentId, file } = post || {};

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      setPost({ ...post, appointmentId: parseInt(id) });
    }
  }, [id]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({ ...post, file: e.target.files });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "") {
      dispatch(setAlert("Please fill all fields", "danger"));
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("appointmentId", appointmentId);
    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
    }

    dispatch(payment(formData));
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
                  id="file"
                  className="input-text"
                  type="file"
                  name="file"
                  onChange={onChangeImages}
                  multiple
                />
                <label htmlFor="images" className="input-text">
                  Choose Images
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
