import React, { useEffect } from "react";
import Helmet from "react-helmet";
// Actions
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cancelAppointment,
  downloadImage,
  getAppointmentsForProvider,
} from "../../../redux/planning/planning-slice";

// Utils
import { WEBSITE_NAME } from "../../../utils/websiteData";

// Styles
import useStyles from "./style";

// Components
import Spinner from "../../../components/spinner";
import { Button, Card, CardGroup, Placeholder, Row } from "react-bootstrap";

const ProviderAppointments: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { provider_appointments, loading } = useAppSelector(
    state => state.planning
  );
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getAppointmentsForProvider(user?.email));
    }
    //eslint-disable-next-line
  }, [user]);

  const deleteAppointment = (id: number) => {
    dispatch(cancelAppointment(id, user?.email || ""));
  };

  const downloadReceipt = (id: number) => {
    dispatch(downloadImage(id));
  };
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Appointments`}</title>
      </Helmet>

      <div className={`${classes.page} `}>
        <div className="card-shadow text-center">
          <div className="head">
            <h3 className="title">My Appointments</h3>
          </div>

          <div className="content mt-5">
            <>
              <div className="section basic-info mt-4">
                <h5 className="title text-left mt-2">
                  List of all your appointments
                </h5>
              </div>
            </>
            <div className="container d-flex justify-content-around">
              {loading ? (
                <Spinner />
              ) : (
                <CardGroup className="card-group">
                  {provider_appointments.length > 0 ? (
                    provider_appointments.map(appointment => (
                      <div className="postitem card-shadow postitem-card p-3 mb-4">
                        <div className="row">
                          <div className="col-12 d-flex flex-column text-left">
                            <div className="postitem-details-top mt-3 mt-md-0">
                              <div className="line-top">
                                <h5 className="title">
                                  {appointment?.provider?.username}
                                  {appointment.isPayed ? (
                                    <span className="ml-5 badge badge-success">
                                      Payed
                                    </span>
                                  ) : (
                                    <span className="ml-5 badge badge-danger">
                                      Not payed
                                    </span>
                                  )}
                                </h5>
                              </div>
                              <p className="description">
                                <strong>Provider email: </strong>{" "}
                                {appointment?.providerEmail}
                              </p>
                              <p className="description">
                                <strong>Starts At: </strong>{" "}
                                {appointment?.startsAt.substring(0, 5)}{" "}
                                <strong>Ends At: </strong>{" "}
                                {appointment?.endsAt.substring(0, 5)}
                              </p>
                            </div>
                            <div className="postitem-details-bottom mt-auto">
                              <p className="location mb-0">{`Alger, Algerie`}</p>
                              <p className="date mb-0">
                                {appointment?.appointmentDate}
                              </p>
                            </div>
                            <div className="btns">
                              <Button
                                onClick={() =>
                                  downloadReceipt(appointment.appointmentId)
                                }
                                className="button-primary mb-2"
                              >
                                Payment status
                              </Button>

                              <Button
                                className="button-danger mb-2"
                                onClick={() =>
                                  deleteAppointment(appointment.appointmentId)
                                }
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Card style={{ width: "18rem" }} className="card">
                      <Card.Body className="card-body">
                        <Card.Text>
                          <strong>No appointments </strong>
                        </Card.Text>
                        <Card.Text>
                          <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </Card.Text>
                        <Card.Text>
                          <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </Card.Text>
                        <Row className="btns"></Row>
                      </Card.Body>
                    </Card>
                  )}
                </CardGroup>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderAppointments;
