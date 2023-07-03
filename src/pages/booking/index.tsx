import React, { useState, useEffect, Fragment } from "react";
import Helmet from "react-helmet";
import { Dialog, Transition } from "@headlessui/react";
import { BUTTON_PRIMARY } from "../../styling/styling";
// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addAppointment,
  getAppointments,
  getPlanning,
  setAlert,
  uploadFile,
} from "../../redux/planning/planning-slice";
import * as Progress from "@radix-ui/react-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import { Link, useParams } from "react-router-dom";
import Eccp from "../../assets/images/eccp.svg";
import Visa from "../../assets/images/Visa.svg";
// Styles
import useStyles from "./style";
import "react-day-picker/dist/style.css";

// Calendar
import { DayPicker } from "react-day-picker";
import { format, isSameDay } from "date-fns";

// Components
import Spinner from "../../components/spinner";
import { RadioGroup, Tab } from "@headlessui/react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import { Appointment } from "../../types";
import { isAfter } from "date-fns";
import { payment } from "../../redux/planning/planning-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface StateType {
  email: string;
  username: string;
  file: FileList | null;
}
interface InfoState {
  domain: string;
  description: string;
  otherFile: FileList | null;
}

const Booking: React.FC = () => {
  const classes = useStyles();

  const { user } = useAppSelector(state => state.auth);
  const { planning, loading, appointment } = useAppSelector(
    state => state.planning
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlanning(id || ""));
  }, [id]);

  const [selected, setSelected] = useState<Date>();
  const [formatedDate, setFormatedDate] = useState<string>(
    format(selected || new Date(), "yyyy-MM-dd")
  );
  const [plan, setPlan] = useState<number>(0);

  const [rdv, setRdv] = useState<Appointment>({
    token: "",
    clientEmail: "",
    providerUsername: "",
    link: "",
    date: "",
    day: 0,
    slot: 0,
  });

  const onBookInterview = () => {
    const date: string = formatedDate;
    const slot: number = plan;
    const day: number = (selected || new Date()).getDay() + 1 || 0;
    const token: string = localStorage.getItem("token") || "";
    const clientEmail: string = user?.email || "";
    const providerUsername = id || "";
    const appointment: Appointment = {
      token,
      clientEmail,
      providerUsername,
      date,
      slot,
      day,
      link: "",
    };

    if (
      isAfter(selected || new Date(), new Date()) ||
      isSameDay(selected || new Date(), new Date())
    ) {
      openModal();
      setRdv(appointment);
    } else {
      dispatch(setAlert("You can't book an appointment in the past", "danger"));
    }
  };

  useEffect(() => {
    setFormatedDate(format(selected || new Date(), "yyyy-MM-dd"));
  }, [selected]);

  const isDisabled = (date: any) => {
    return !planning?.days.some(day => day.dayId === date.getDay() + 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function submitAndClose() {
    dispatch(addAppointment(rdv));
    closeModal();
    setStep(step + 1);
  }
  const [step, setStep] = useState(0);
  const onNext: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  const onPrevious: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const [post, setPost] = useState<StateType>({
    email: "",
    username: "",
    file: null,
  });
  const { email, username, file } = post || {};

  const [moreInfo, setMoreInfo] = useState<InfoState>({
    domain: "",
    description: "",
    otherFile: null,
  });

  const { domain, description, otherFile } = moreInfo || {};

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMoreInfo({
      ...moreInfo,
      [e.target.name]: e.target.value,
    });

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMoreInfo({ ...moreInfo, otherFile: e.target.files });

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({ ...post, file: e.target.files });

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMoreInfo({
      ...moreInfo,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "") {
      dispatch(setAlert("Please fill all fields", "danger"));
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append(
      "appointmentId",
      localStorage.getItem("appointmentId") || "0"
    );
    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
    }
    dispatch(payment(formData));
  };

  const onSubmitInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (domain === "" || description === "") {
      dispatch(setAlert("Please fill all fields", "danger"));
      return;
    }

    const formData = new FormData();

    formData.append("domain", domain);
    formData.append("description", description);
    formData.append(
      "appointmentId",
      localStorage.getItem("appointmentId") || "0"
    );
    if (otherFile) {
      for (let i = 0; i < otherFile.length; i++) {
        formData.append("file", otherFile[i]);
      }
    }
    dispatch(uploadFile(formData));
  };

  const appointmentId = localStorage.getItem("appointmentId");

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointments(parseInt(appointmentId)));
    }
  }, [appointmentId]);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Booking`}</title>
      </Helmet>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          style={{ position: "relative", zIndex: 10 }}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </Transition.Child>

          <div
            style={{
              overflowY: "auto",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "1rem",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    overflow: "hidden",
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                    transitionProperty: "all",
                    textAlign: "left",
                    verticalAlign: "middle",
                    width: "100%",
                    maxWidth: "28rem",
                    borderRadius: "1rem",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    style={{
                      color: "#111827",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      lineHeight: "1.5rem",
                    }}
                  >
                    Confirm Appointment
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure
                      <br />
                      You want to confirm this appointment?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      style={{
                        display: " inline-flex",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        backgroundColor: "#DBEAFE",
                        color: "#1E3A8A",
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                        fontWeight: "500",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                      onClick={submitAndClose}
                    >
                      Yes, Book!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {step === 0 ? (
        <div className={`${classes.page} card-shadow text-center`}>
          <div className="head">
            <Progress.Root className="ProgressRoot" value={0}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{ width: `0%` }}
              />
            </Progress.Root>
          </div>

          <div className="content mt-5">
            <>
              <div className="section basic-info mt-4">
                <h5 className="title text-left mt-2">
                  Select a date for the interview
                </h5>
              </div>
            </>
            <Row className="pick">
              <div className="days">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  footer={false}
                  modifiers={{ disabled: isDisabled }}
                />
              </div>
              <div className="slots">
                {!loading ? (
                  <Tab.Group>
                    <Tab.List className="tab-list">
                      <Tab className="page">Page 1</Tab>
                      <Tab className="page">Page 2</Tab>
                      <Tab className="page">Page 3</Tab>
                    </Tab.List>
                    <Tab.Panels className="radio-group">
                      <Tab.Panel>
                        <RadioGroup
                          className="radio-group"
                          value={plan}
                          onChange={setPlan}
                        >
                          {planning?.slots.map(
                            slot =>
                              slot.timeSlotId > 0 &&
                              slot.timeSlotId < 16 && (
                                <Fragment key={slot.timeSlotId}>
                                  <RadioGroup.Option
                                    className={clsx("radio-option", {
                                      "bg-selected": plan === slot.timeSlotId,
                                      "bg-not-selected":
                                        plan !== slot.timeSlotId,
                                    })}
                                    value={slot.timeSlotId}
                                  >
                                    <span>
                                      From {slot.startsAt.substring(0, 5)} to{" "}
                                      {slot.endsAt.substring(0, 5)}
                                    </span>
                                  </RadioGroup.Option>
                                </Fragment>
                              )
                          )}
                        </RadioGroup>
                      </Tab.Panel>
                      <Tab.Panel>
                        <RadioGroup
                          className="radio-group"
                          value={plan}
                          onChange={setPlan}
                        >
                          {planning?.slots.map(
                            slot =>
                              slot.timeSlotId > 15 &&
                              slot.timeSlotId < 33 && (
                                <Fragment key={slot.timeSlotId}>
                                  <RadioGroup.Option
                                    className={clsx("radio-option", {
                                      "bg-selected": plan === slot.timeSlotId,
                                      "bg-not-selected":
                                        plan !== slot.timeSlotId,
                                    })}
                                    value={slot.timeSlotId}
                                  >
                                    <span>
                                      From {slot.startsAt.substring(0, 5)} to{" "}
                                      {slot.endsAt.substring(0, 5)}
                                    </span>
                                  </RadioGroup.Option>
                                </Fragment>
                              )
                          )}
                        </RadioGroup>
                      </Tab.Panel>
                      <Tab.Panel>
                        {" "}
                        <RadioGroup
                          className="radio-group"
                          value={plan}
                          onChange={setPlan}
                        >
                          {planning?.slots.map(
                            slot =>
                              slot.timeSlotId > 32 && (
                                <Fragment key={slot.timeSlotId}>
                                  <RadioGroup.Option
                                    className={clsx("radio-option", {
                                      "bg-selected": plan === slot.timeSlotId,
                                      "bg-not-selected":
                                        plan !== slot.timeSlotId,
                                    })}
                                    value={slot.timeSlotId}
                                  >
                                    <span>
                                      From {slot.startsAt.substring(0, 5)} to{" "}
                                      {slot.endsAt.substring(0, 5)}
                                    </span>
                                  </RadioGroup.Option>
                                </Fragment>
                              )
                          )}
                        </RadioGroup>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                ) : (
                  <Spinner />
                )}
              </div>
            </Row>
            <div className="section basic-info mt-4">
              <button onClick={onPrevious} className="btn btn-secondary">
                Back
              </button>
              <button onClick={onBookInterview} className="btn btn-primary">
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : step === 1 ? (
        <div className={`${classes.page} card-shadow text-center`}>
          <div className="head">
            <Progress.Root className="ProgressRoot" value={33}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{ width: `33%` }}
              />
            </Progress.Root>
          </div>

          <div className="content mt-5">
            <div className="col-form">
              <form onSubmit={onSubmitInfo}>
                <div className="form-group">
                  <label htmlFor="domain">Domaine</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Domaine"
                    name="domain"
                    value={domain}
                    onChange={onChangeInfo}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="details">Details</label>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={onChangeDescription}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="otherFile">Autre fichier</label>
                  <input
                    type="file"
                    className="form-control-file"
                    placeholder="Autre fichier"
                    name="otherFile"
                    onChange={onChangeFile}
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{
                      ...BUTTON_PRIMARY,
                    }}
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                </div>
                <div className="section basic-info mt-4">
                  <Link to="/interviews/1/providers">
                    <button className="btn btn-secondary">Back</button>
                  </Link>

                  <button onClick={onNext} className="btn btn-primary">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div className={`${classes.page} card-shadow text-center`}>
          <div className="head">
            <Progress.Root className="ProgressRoot" value={66}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{ width: `66%` }}
              />
            </Progress.Root>
          </div>
          <div className="content mt-5">
            <div className="col-form">
              <Row className="row-container">
                <Accordion type="single" collapsible className="accordion">
                  <AccordionItem className="item" value="item-1">
                    <AccordionTrigger className="sub-item  item-title">
                      <h5>Recu de paiement CCP</h5>{" "}
                      <img src={Eccp} alt="eccp" />
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
                  <AccordionItem className="item" value="item-2">
                    <AccordionTrigger className="sub-item  item-title">
                      <h5>Carte de crédit / débit</h5>{" "}
                      <img src={Visa} alt="visa" />
                    </AccordionTrigger>
                    <AccordionContent className="sub-item">
                      Yes. It comes with default styles that matches the other
                      components' aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="paper">
                  {!loading && appointment ? (
                    <>
                      <h5>Nous confirmons votre RDV </h5>
                      <h5>Email de Candidat : {appointment.clientEmail} </h5>
                      <h5>
                        Email de prestataire : {appointment.providerEmail}{" "}
                      </h5>
                      <h5>
                        Date :{" "}
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h5>
                      <h5>
                        Heure :
                        {parseInt(appointment.startsAt.split(":")[0]) > 12
                          ? `${
                              parseInt(appointment.startsAt.split(":")[0]) - 12
                            }:${appointment.startsAt.split(":")[1]} PM`
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
            <div className="section basic-info mt-4">
              <button onClick={onPrevious} className="btn btn-secondary">
                Back
              </button>

              <button onClick={onNext} className="btn btn-primary">
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className={`${classes.page} card-shadow text-center`}>
          <div className="head">
            <Progress.Root className="ProgressRoot" value={100}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{ width: `100%` }}
              />
            </Progress.Root>
          </div>

          <div className="content mt-5">
            {loading && appointment ? (
              <>
                <h2>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color="green"
                    size="1x"
                  />
                  Félicitations
                </h2>
                <h5>
                  Votre RDV est confirmé. Vous recevrez un email de confirmation
                </h5>

                <div className="paper">
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
                </div>
              </>
            ) : (
              <>
                <h2>
                  <FontAwesomeIcon icon={faTimesCircle} color="red" size="1x" />
                  Désolé ! Votre RDV n'est pas confirmé
                </h2>
              </>
            )}
            <div className="section basic-info mt-4">
              <Link to="/">
                <button className="btn btn-secondary">Back</button>
              </Link>
              <Link to="/">
                <button className="btn btn-primary">Continue</button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Booking;
