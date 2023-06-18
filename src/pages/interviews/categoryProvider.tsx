import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Helmet from "react-helmet";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadProviders } from "../../redux/categories/categories-slice";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import formatedDate from "../../utils/formatedDate";

// Styles & Icons
import useStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CategoryProviders: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { providers } = useAppSelector(state => state.categories);

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadProviders(id || ""));
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Your posts`}</title>
      </Helmet>
      <div className={`${classes.page} user-posts text-center`}>
        {!providers ? (
          <div className="row mt-5">
            <div className="col text-center">
              <h5>No Providers found!</h5>
            </div>
          </div>
        ) : (
          <div className="row mt-4">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table text-left">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col">Price</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Status</th>
                      <th scope="col">Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map(post => (
                      <PostItem key={post.providerId} post={post} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryProviders;

const PostItem = (props: any) => {
  const { post } = props;
  const { providerId, user, category } = post;
  return (
    <tr>
      <td>{providerId}</td>
      <td>
        <Link className="link-primary" to={`/booking/${user.username}`}>
          {`${user.firstName} ${user.lastName}`}{" "}
        </Link>
      </td>
      <td>{category != null && category.title}</td>
      <td>{Date.now() != null && formatedDate(Date.now())}</td>
      <td>{"1500 DZA"}</td>
      <td>{"30 min"}</td>

      <td>
        <span
          className={`type ${
            parseInt("1") === 1 ? "bg-success" : "bg-primary"
          }`}
        >
          {parseInt("1") === 1 ? "Verified" : "Not verified"}
        </span>
      </td>
      <td>
        <Link className="button-primary" to={`/booking/${user.username}`}>
          {"Book Now!"} <FontAwesomeIcon className="ml-1" icon={faArrowRight} />
        </Link>
      </td>
    </tr>
  );
};
