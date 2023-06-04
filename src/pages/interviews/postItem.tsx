import React from "react";
import { Link } from "react-router-dom";

// Utils
import formatedDate from "../../utils/formatedDate";

import NoImage from "../../assets/images/no-image.svg";
import Euro from "../../assets/images/Euro.png";
import Frontend from "../../assets/images/frontend.png";
import Backend from "../../assets/images/backend.png";

interface PostItemProps {
  post: any;
  type: string;
}
const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  const { post, type } = props;

  const { categoryId, title, description, space } = post;

  return (
    <div className="postitem postitem-card p-3 mb-4">
      <div className="row">
        <div className="col-12 col-md-3">
          <Link
            to={`/${
              space === "INTERVIEW"
                ? "interviews"
                : space === "CONSULTATION"
                ? "consultations"
                : "shares"
            }/${categoryId}`}
          >
            <img
              className="img img-fluid img-rounded-corners"
              src={
                categoryId === 1
                  ? Euro
                  : categoryId === 2
                  ? Frontend
                  : categoryId === 3
                  ? Backend
                  : NoImage
              }
              alt="post"
            />
          </Link>
        </div>
        <div className="col-12 col-md-9 d-flex flex-column text-left">
          <div className="postitem-details-top mt-3 mt-md-0">
            <Link
              to={`/${
                space === "INTERVIEW"
                  ? "interviews"
                  : space === "CONSULTATION"
                  ? "consultations"
                  : "shares"
              }/${categoryId}`}
            >
              <h5 className="title">
                {title}{" "}
                {true && (
                  <span className="ml-2 badge badge-success">New Offer</span>
                )}
              </h5>
              <p className="description">
                {description.length > 147
                  ? description.substring(0, 147) + ".."
                  : description}
              </p>
            </Link>
          </div>
          <div className="postitem-details-bottom mt-auto">
            <p className="location mb-0">{`Alger, Algerie`}</p>
            <p className="date mb-0">{formatedDate(Date.now())}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
