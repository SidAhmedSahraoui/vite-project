import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faFileAlt,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetState,
  loadCategory,
} from "../../redux/categories/categories-slice";

// Utils
import formatedDate from "../../utils/formatedDate";
import { WEBSITE_NAME } from "../../utils/websiteData";

// Components
import Spinner from "../../components/spinner";
import DialogPhone from "../../components/dialogs/dialogPhone";

// Images
import Euro from "../../assets/images/Euro.png";
import Frontend from "../../assets/images/frontend.png";
import Backend from "../../assets/images/backend.png";
import Canada from "../../assets/images/canada.jpg";
import Turkey from "../../assets/images/turkey.jpg";

// Styles
import useStyles from "./style";
import DialogMessage from "../../components/dialogs/dialogMessage";

const InterviewShow: React.FC = () => {
  const classes = useStyles();

  const [showPhone, setShowPhone] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const handleHidePhone = () => {
    setShowPhone(false);
  };
  const handleShowPhone = () => {
    setShowPhone(true);
  };
  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleMessageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandle = async () => {
    if (!message) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    /*await sendMessage({
      user_Reciever: request.user_id,
      content: message,
    });*/
    console.log("Message sent: " + message);
  };

  const handleHideMessage = () => {
    setShowMessage(false);
    setMessage("");
  };

  const dispatch = useAppDispatch();
  const { category, loading } = useAppSelector(state => state.categories);
  const { id } = useParams();

  useEffect(() => {
    dispatch(resetState());
    dispatch(loadCategory(id || "0"));
  }, []);

  const { categoryId, title, description } = category || {};

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | ${
          loading ? "Loading..." : title || "Not found"
        }`}</title>
      </Helmet>
      <>
        <div className={`${classes.page} card-shadow text-center`}>
          {loading ? (
            <Spinner />
          ) : !category ? (
            <div className="row">
              <div className="col">Not found</div>
            </div>
          ) : (
            <div className="content">
              <div className="row">
                <div className="col">
                  <h6 className="text-left">
                    <Link className="link-primary" to={`/interviews`}>
                      <FontAwesomeIcon className="mr-1" icon={faArrowLeft} />
                      Back to Categories
                    </Link>
                  </h6>

                  <div className="post-content mt-4">
                    <h3 className="title">{title}</h3>

                    <div className="description mt-3 mx-auto">
                      <h6 className="subtitle mb-2">
                        <FontAwesomeIcon
                          className="icon mr-2"
                          icon={faFileAlt}
                        />
                        Description
                      </h6>
                      <p className="mb-1">{description}</p>
                    </div>

                    <p className="mb-1">
                      <span className="date">{formatedDate(Date.now())}</span>
                    </p>

                    <div className="pictures mt-4">
                      <div className="row justify-content-center align-items-center">
                        {categoryId ? (
                          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <img
                              className="img img-fluid img-rounded-corners mb-2"
                              src={
                                categoryId === 1
                                  ? Euro
                                  : categoryId === 2
                                  ? Frontend
                                  : categoryId === 3
                                  ? Backend
                                  : categoryId === 4
                                  ? Canada
                                  : Turkey
                              }
                              alt={title}
                            />
                          </div>
                        ) : (
                          <div className="col">No pictures</div>
                        )}
                      </div>
                    </div>

                    <div className="contact-details text-center mt-4">
                      <FontAwesomeIcon
                        className="icon mb-2"
                        icon={faMapMarkerAlt}
                      />
                      <div className="location">
                        <h6>{`Alger, Algerie`}</h6>
                      </div>

                      <h5 className="title mb-4">
                        Pour plus d'informations, veuillez contacter nous
                      </h5>

                      <div className="mt-4">
                        <div className="d-block d-md-inline-block mb-2 mr-md-2">
                          <button
                            className="button-primary"
                            onClick={handleShowPhone}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faPhoneAlt}
                            />
                            Appel direct
                          </button>
                        </div>
                        <div className="d-block d-md-inline-block mb-2 mr-md-2">
                          <button
                            className="button-primary"
                            onClick={handleShowMessage}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faMessage}
                            />
                            Envoyer un message
                          </button>
                        </div>
                        <div className="d-inline d-md-inline-block">
                          <Link
                            to={`/interviews/${id}/providers`}
                            className="button-transparent"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faEnvelope}
                            />
                            Prendre un rendez-vous
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogPhone
          show={showPhone}
          phone={"0666666666"}
          onHide={handleHidePhone}
        />
        <DialogMessage
          show={showMessage}
          message={message}
          handleMessageOnChange={handleMessageOnChange}
          sendMessage={sendMessageHandle}
          onHide={handleHideMessage}
        />

        {/*<DialogImage show={showImage} image={image} onHide={handleHideImage} />*/}
      </>
    </>
  );
};

export default InterviewShow;
