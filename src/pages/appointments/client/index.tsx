import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Actions
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getAppointmentsForClient,
  cancelAppointment,
} from "../../../redux/planning/planning-slice";

// Utils
import { WEBSITE_NAME } from "../../../utils/websiteData";
import { MyAppointment } from "../../../types";
// Styles
import useStyles from "./style";

// Components
import Spinner from "../../../components/spinner";
import PostItem from "../postItem";

const ClientAppointments: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [post_search, setSearch] = useState({
    keywords: "",
    provider: 0,
    wilaya: 0,
    city: 0,
  });

  const { client_appointments, loading } = useAppSelector(
    state => state.planning
  );
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getAppointmentsForClient(user?.email));
    }
    //eslint-disable-next-line
  }, [user]);

  const deleteAppointment = (id: number) => {
    dispatch(cancelAppointment(id, user?.email || ""));
  };

  const { keywords, provider, wilaya, city } = post_search;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch({ ...post_search, [e.target.name]: e.target.value });

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearch({ ...post_search, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //getRequests(keywords, category, wilaya, city);
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Appointments`}</title>
      </Helmet>

      <div className={`${classes.page} text-center`}>
        <h3 className="title">Appointments</h3>
        <h6 className="subtitle">Here you find all your next appointment</h6>
        <div className="search-form card-shadow mt-4 pt-4">
          <div className="d-lg-none mb-1">
            <a
              className="button-light"
              data-toggle="collapse"
              href="#collapse-form"
              role="button"
              aria-expanded="false"
              aria-controls="collapse-form"
            >
              <FontAwesomeIcon className="mr-2" icon={faSearch} />
              Show Filter
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="collapse mt-3"
            id="collapse-form"
          >
            <div className="form-row align-items-center justify-content-center">
              <div className="col-12 col-lg-3">
                <input
                  name="keywords"
                  value={keywords}
                  onChange={onChange}
                  type="text"
                  className="input-text mb-2"
                  placeholder="Search.."
                />
              </div>

              <div className="col-12 col-lg-2">
                <select
                  name="provider"
                  value={provider}
                  onChange={onChangeSelect}
                  className="custom-select input-select input-text mb-2"
                >
                  {loading ? (
                    <option value="0">Loading...</option>
                  ) : (
                    <>
                      <option value="0">All providers</option>
                      {client_appointments !== null &&
                        client_appointments.length > 0 &&
                        client_appointments.map((app: MyAppointment) => (
                          <option
                            key={app.appointmentId}
                            value={app.appointmentId}
                          >
                            {app.provider.username}
                          </option>
                        ))}
                    </>
                  )}
                </select>
              </div>

              <div className="col-12 col-lg-2">
                <select
                  name="wilaya"
                  value={wilaya}
                  onChange={onChangeSelect}
                  className="custom-select input-select input-text mb-2"
                >
                  {loading ? (
                    <option value="0">Loading...</option>
                  ) : (
                    <>
                      <option value="0">Select a wilaya</option>
                    </>
                  )}
                </select>
              </div>

              <div className="col-12 col-lg-2">
                <select
                  name="city"
                  value={city}
                  onChange={onChangeSelect}
                  className="custom-select input-select input-text mb-2"
                >
                  {loading ? (
                    <option value="0">Loading...</option>
                  ) : (
                    <>
                      <option value="0">Select a city</option>
                    </>
                  )}
                </select>
              </div>

              <div className="col-12 col-lg-1">
                <button type="submit" className="button-primary mb-2">
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>

        {client_appointments !== null && !loading ? (
          <div className="content mt-5">
            <h6 className="text-left">
              Categories ({client_appointments.length})
            </h6>
            <div className="posts mt-3">
              {client_appointments.length < 1 ? (
                <div className="no-requests mt-5">
                  <h5>No appointments found!</h5>
                </div>
              ) : (
                client_appointments.map(post => (
                  <PostItem
                    key={post.appointmentId}
                    post={post}
                    onCancel={() => deleteAppointment(post.appointmentId)}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="content text-center mt-5">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ClientAppointments;
