import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loadCategories,
  resetState,
} from "../../redux/categories/categories-slice";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";

// Components
import Spinner from "../../components/spinner";
import PostItem from "./postItem";
// Styles
import useStyles from "./style";
import Sidbar from "../../components/sidbar";
import { useParams } from "react-router-dom";

const Interviews: React.FC = () => {
  const classes = useStyles();

  const {
    categories,
    hiring_categories,
    study_categories,
    loading,
    loading_categories,
  } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [post_search, setSearch] = useState({
    keywords: "",
    category: 0,
    wilaya: 0,
    city: 0,
  });

  const { keywords, category, wilaya, city } = post_search;

  useEffect(() => {
    dispatch(resetState());
    dispatch(loadCategories());
  }, []);

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
        <title>{`${WEBSITE_NAME} | Interviews`}</title>
      </Helmet>

      <div className={`${classes.page} text-center`}>
        <h3 className="title">Interviews</h3>
        <h6 className="subtitle">
          Find people, tools or resources for a better interviews preparation
        </h6>
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
                  name="category"
                  value={category}
                  onChange={onChangeSelect}
                  className="custom-select input-select input-text mb-2"
                >
                  {loading_categories ? (
                    <option value="0">Loading...</option>
                  ) : (
                    <>
                      <option value="0">All categories</option>
                      {categories !== null &&
                        categories.length > 0 &&
                        categories.map(category => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.title}
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

        {categories !== null && !loading ? (
          <div className="content mt-5">
            <div className="row">
              <div className="col-12 col-lg-9">
                <h6 className="text-left">Categories ({categories.length})</h6>
                <div className="posts mt-3">
                  {categories.length < 1 ? (
                    <div className="no-requests mt-5">
                      <h5>No requests found!</h5>
                    </div>
                  ) : id === "hiring" ? (
                    hiring_categories.map(category => (
                      <PostItem
                        key={category.categoryId}
                        post={category}
                        type={"simple"}
                      />
                    ))
                  ) : id === "study" ? (
                    study_categories.map(category => (
                      <PostItem
                        key={category.categoryId}
                        post={category}
                        type={"simple"}
                      />
                    ))
                  ) : (
                    categories.map(category => (
                      <PostItem
                        key={category.categoryId}
                        post={category}
                        type={"simple"}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <Sidbar />
              </div>
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

export default Interviews;
