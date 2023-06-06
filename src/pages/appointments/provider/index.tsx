import React, { useEffect } from "react";
import Helmet from "react-helmet";
// Actions
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cancelAppointment,
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
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Appointments`}</title>
      </Helmet>

      <div className={`${classes.page} card-shadow text-center`}>
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
                    <Card
                      style={{ width: "18rem" }}
                      key={appointment.appointmentId}
                      className="card"
                    >
                      <Card.Body className="card-body">
                        <Card.Text>
                          <strong>Meeting with: </strong>
                          {appointment?.client?.email}
                        </Card.Text>
                        <Card.Text>
                          <strong>Meeting date: </strong>
                          {appointment?.appointmentDate}
                        </Card.Text>
                        <Card.Text>
                          <strong>Meeting time: </strong>
                          {appointment?.startsAt.substring(0, 5)}
                        </Card.Text>
                        <Row className="btns">
                          <Button variant="primary">Go to meeting</Button>
                          <Button
                            variant="danger"
                            onClick={() =>
                              deleteAppointment(appointment.appointmentId)
                            }
                          >
                            Cancel appointment
                          </Button>
                        </Row>
                      </Card.Body>
                    </Card>
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
    </>
  );
};

export default ProviderAppointments;
