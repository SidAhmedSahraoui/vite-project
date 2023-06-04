import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearErrors,
  loadUser,
  updateProfileAction,
  updatePasswordAction,
  deleteUser,
} from "../../redux/auth/auth-slice";
import { setAlert } from "../../redux/error/error-slice";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Components
import Spinner from "../../components/spinner";

// Styling
import useStyles from "./style";

const Profile: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { user, loading_profile, error } = useAppSelector(state => state.auth);
  useEffect(() => {
    dispatch(loadUser());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error, "danger"));
      dispatch(clearErrors());
    }

    //eslint-disable-next-line
  }, [error]);

  const { username, email, firstName, lastName, phone, roles } = user || {};

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [password_delete, setPassword_delete] = useState("");

  const { old_password, new_password, confirm_password } = passwords;

  const [modifiedUser, setUser] = useState({
    newUsername: username || "",
    newEmail: email || "",
    newFirstName: firstName || "",
    newLastName: lastName || "",
    newPhone: phone || "",
  });

  const { newUsername, newEmail, newFirstName, newLastName, newPhone } =
    modifiedUser;

  const onChangeBasic = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...modifiedUser, [e.target.name]: e.target.value });

  const onChangePasswords = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const onChangePasswordForDelete = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword_delete(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone === "") {
      dispatch(setAlert("Phone number is empty", "danger"));
      return;
    }

    dispatch(
      updateProfileAction(user?.userId || -1, {
        email: newEmail || "",
        firstName: newFirstName || "",
        lastName: newLastName || "",
        username: newUsername || "",
        phone: newPhone || "",
      })
    );
  };

  const onSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello people");
    if (old_password === "") {
      dispatch(setAlert("Old password is empty", "danger"));
      return;
    }

    if (new_password === "" || new_password.length < 6) {
      dispatch(
        setAlert("Password must contain at least 6 characters", "danger")
      );
      return;
    }

    if (new_password !== confirm_password) {
      dispatch(setAlert("Passwords do not match", "danger"));
      return;
    }

    dispatch(
      updatePasswordAction({
        id: username || "",
        oldPassword: old_password,
        newPassword: new_password,
      })
    );
  };

  const onSubmitPasswordForDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password_delete === "") {
      dispatch(setAlert("Password is empty", "danger"));
      return;
    }

    dispatch(deleteUser(user?.userId || -1, password_delete));
  };
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Profile`}</title>
      </Helmet>
      <div className={`${classes.page} card-shadow text-center`}>
        <div className="head">
          <h3 className="title">Profile Information</h3>
          <h6 className="subtitle">Change name, phone number & other info</h6>
        </div>

        <div className="content mt-5">
          <div className="row">
            <div className="col-12 col-lg-9">
              {user && !loading_profile ? (
                <>
                  <div className="section basic-info mt-4">
                    <h5 className="title text-left mt-2">
                      Basic informations & Preferences
                    </h5>
                    <h6 className="text-left">Edit your profile</h6>

                    <form onSubmit={onSubmit}>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="username" className="float-left">
                            Username
                          </label>
                          <input
                            className="input-text"
                            type="text"
                            id="newUsername"
                            name="newUsername"
                            value={username}
                            placeholder="Username"
                            readOnly
                          />
                        </div>

                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="email" className="float-left">
                            Email address
                          </label>
                          <input
                            className="input-text"
                            type="text"
                            id="newEmail"
                            name="newEmail"
                            value={email}
                            placeholder="Email address"
                            readOnly
                          />
                        </div>

                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="firstname" className="float-left">
                            First name
                          </label>
                          <input
                            className="input-text"
                            type="text"
                            id="newFirstName"
                            name="newFirstName"
                            value={newFirstName}
                            placeholder="First name"
                            onChange={onChangeBasic}
                          />
                        </div>

                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="lastname" className="float-left">
                            Last name
                          </label>
                          <input
                            className="input-text"
                            type="text"
                            id="newLastName"
                            name="newLastName"
                            value={newLastName}
                            placeholder="Last name"
                            onChange={onChangeBasic}
                          />
                        </div>

                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="phone" className="float-left">
                            Phone
                          </label>
                          <input
                            className="input-text"
                            type="text"
                            id="newPhone"
                            name="newPhone"
                            value={newPhone}
                            placeholder="Phone"
                            onChange={onChangeBasic}
                          />
                        </div>

                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="wilaya" className="float-left">
                            Wilaya
                          </label>
                          <select
                            id="wilaya"
                            name="wilaya"
                            //value={wilaya}
                            //onChange={onChangeBasic}
                            className="custom-select input-select input-text"
                          >
                            {/*loading_states ? (
                              <option value="0">Loading...</option>
                            ) : (
                              <>
                                <option value="0">Select a wilaya</option>
                                {wilayas !== null &&
                                  wilayas.length > 0 &&
                                  wilayas.map(wilaya => (
                                    <option
                                      key={wilaya.code}
                                      value={wilaya.code}
                                    >
                                      {wilaya.label}
                                    </option>
                                  ))}
                              </>
                                  )*/}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="submit"
                            value="Save"
                            className="button-gray float-right mt-2"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="section security mt-4">
                    <h5 className="title text-left">Security</h5>
                    <form onSubmit={onSubmitPassword}>
                      <div className="row text-left mt-2">
                        <div className="col">
                          <h6>Change password</h6>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-12 col-lg-4">
                          <label htmlFor="old_password" className="float-left">
                            Old password
                          </label>
                          <input
                            className="input-text"
                            type="password"
                            id="old_password"
                            name="old_password"
                            value={old_password}
                            placeholder="Old password"
                            onChange={onChangePasswords}
                          />
                        </div>

                        <div className="form-group col-12 col-lg-4">
                          <label htmlFor="new_password" className="float-left">
                            New password
                          </label>
                          <input
                            className="input-text"
                            type="password"
                            id="new_password"
                            name="new_password"
                            value={new_password}
                            placeholder="New password"
                            onChange={onChangePasswords}
                          />
                        </div>

                        <div className="form-group col-12 col-lg-4">
                          <label
                            htmlFor="confirm_password"
                            className="float-left"
                          >
                            Confirmation
                          </label>
                          <input
                            className="input-text"
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={confirm_password}
                            placeholder="Confirmation"
                            onChange={onChangePasswords}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <input
                            type="submit"
                            value="Confirm"
                            className="button-gray float-right mt-2"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="section delete mt-4">
                    <h5 className="title text-left">Delete your account</h5>
                    <form onSubmit={onSubmitPasswordForDelete}>
                      <div className="row text-left mt-2">
                        <div className="col">
                          <h6>Password</h6>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-12 col-lg-4">
                          <input
                            className="input-text"
                            type="password"
                            id="password_delete"
                            name="password_delete"
                            value={password_delete}
                            placeholder="Password"
                            onChange={onChangePasswordForDelete}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <input
                            type="submit"
                            value="Confirm"
                            className="button-danger float-right mt-2"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="content text-center mt-5">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
