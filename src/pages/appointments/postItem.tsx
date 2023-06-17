import { Link } from "react-router-dom";

import NoImage from "../../assets/images/no-image.svg";
/*import Euro from "../../assets/images/Euro.png";
import Frontend from "../../assets/images/frontend.png";
import Backend from "../../assets/images/backend.png";
import { MyAppointment } from "../../types";*/
import { Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { MyAppointment } from "../../types";

interface PropsType {
  post: MyAppointment;
  onCancel: () => void;
}

const PostItem = (props: PropsType) => {
  const { post, onCancel } = props;
  return (
    <div className="postitem postitem-card p-3 mb-4">
      <div className="row">
        <div className="col-12 col-md-3">
          <Link to="/">
            <img
              className="img img-fluid img-rounded-corners"
              src={
                /*categoryId === 1
                  ? Euro
                  : categoryId === 2
                  ? Frontend
                  : categoryId === 3
                  ? Backend
                  : */ NoImage
              }
              alt="post"
            />
          </Link>
        </div>
        <div className="col-12 col-md-9 d-flex flex-column text-left">
          <div className="postitem-details-top mt-3 mt-md-0">
            <div className="line-top">
              <h5 className="title">
                {post?.provider?.username}
                {post.isPayed ? (
                  <span className="ml-5 badge badge-success">Payed</span>
                ) : (
                  <span className="ml-5 badge badge-danger">Not payed</span>
                )}
              </h5>
              {!post.isPayed && (
                <Link to={`/payment/${post.appointmentId}`}>
                  Pay fees
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              )}
            </div>
            <p className="description">
              <strong>Provider email: </strong> {post?.providerEmail}
            </p>
            <p className="description">
              <strong>Starts At: </strong> {post?.startsAt.substring(0, 5)}{" "}
              <strong>Ends At: </strong> {post?.endsAt.substring(0, 5)}
            </p>
          </div>
          <div className="postitem-details-bottom mt-auto">
            <p className="location mb-0">{`Alger, Algerie`}</p>
            <p className="date mb-0">{post?.appointmentDate}</p>
          </div>
          <Row className="row-bottom">
            <Link to={`/payment/${post.appointmentId}`}>
              <Button className="button-primary mb-2">Go to meeting</Button>
            </Link>

            <Button className="button-danger mb-2" onClick={onCancel}>
              Cancel Appointment
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
