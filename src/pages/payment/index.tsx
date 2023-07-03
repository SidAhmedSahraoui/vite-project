import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Styles
import useStyles from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAlert } from "../../redux/error/error-slice";
import { useParams } from "react-router-dom";
import { getAppointments, payment } from "../../redux/planning/planning-slice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Progress } from "../../components/ui/progress";
import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

interface StateType {
  email: string;
  username: string;
  appointmentId: number | null;
  file: FileList | null;
}

const Payment: React.FC = () => {
  const classes = useStyles();

  const { appointment, loading } = useAppSelector(state => state.planning);

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
      dispatch(getAppointments(parseInt(id)));
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
    formData.append("appointmentId", appointmentId?.toString() || "");
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
        <title>{`${WEBSITE_NAME} | Payment`}</title>
      </Helmet>

      <div className={`${classes.page} text-center`}>
        <div
          className="card-shadow search-form"
          style={{
            height: "650px",
          }}
        >
          <h3 className="title">Payment</h3>
          <h6 className="subtitle">Proceed with payment</h6>
          <Progress value={33} />
          <Row className="row-container">
            <Accordion type="single" collapsible className="accordion">
              <AccordionItem className="item" value="item-1">
                <AccordionTrigger className="sub-item  item-title">
                  Recu de paiement CCP <FontAwesomeIcon icon={faPlayCircle} />
                </AccordionTrigger>
                <AccordionContent className="sub-item item-content">
                  <form onSubmit={onSubmit} className="form">
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

                      <button type="submit" className="button-primary">
                        Pay Now
                      </button>
                    </div>
                  </form>{" "}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="paper">
              {!loading && appointment ? (
                <>
                  <h5>Nous confirmons votre RDV </h5>
                  <h5>Email de Candidat : {appointment.clientEmail} </h5>
                  <h5>Email de prestataire : {appointment.providerEmail} </h5>
                  <h5>
                    Date :{" "}
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "fr-FR",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </h5>
                  <h5>
                    Heure :
                    {parseInt(appointment.startsAt.split(":")[0]) > 12
                      ? `${parseInt(appointment.startsAt.split(":")[0]) - 12}:${
                          appointment.startsAt.split(":")[1]
                        } PM`
                      : `${appointment.startsAt.split(":")[0]}:${
                          appointment.startsAt.split(":")[1]
                        } AM`}
                  </h5>
                  <h5>Durée : 30 min </h5>
                  <h5>Metez vous a l’heure.</h5>
                </>
              ) : (
                <>
                  <h5>Vous n'avez pas de RDV</h5>
                </>
              )}
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Payment;
