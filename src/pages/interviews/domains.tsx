import React, { useEffect } from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";
import Home from "../../assets/images/page.svg";
// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loadCategories,
  resetState,
} from "../../redux/categories/categories-slice";
import { useParams } from "react-router-dom";

const Domains: React.FC = () => {
  const classes = useStyles();
  const { hiring_categories, study_categories, loading_categories } =
    useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(resetState());
    dispatch(loadCategories());
  }, []);

  return (
    <div className={classes.pageCategories}>
      <div className="categories">
        <div className="group-link">
          {!loading_categories ? (
            id === "hiring" ? (
              hiring_categories.map((category: any) => (
                <Link to={`/interviews/show/${category.id}`} className="link">
                  <button className="button-primary">{category.name}</button>
                </Link>
              ))
            ) : (
              study_categories.map((category: any) => (
                <Link
                  key={category.categoryId}
                  to={`/interviews/show/${category.categoryId}`}
                  className="link"
                >
                  <button className="button-primary">{category.title}</button>
                </Link>
              ))
            )
          ) : (
            <div>loading</div>
          )}
        </div>
        <div className="category">
          <img src={Home} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Domains;
