import React, { useEffect } from "react";
import useStyles from "./style";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PostItem from "../../interviews/postItem";
import { getCategories } from "../../../redux/admin/admin-slice";
const Categories: React.FC = () => {
  const classes = useStyles();
  const { categories, loading } = useAppSelector(state => state.admin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <div className={classes.page}>
        <div className="content">
          <h3>Categories</h3>
          <div className="categories">
            {!loading && categories.length > 0 ? (
              categories.map(category => (
                <div className="category">
                  <PostItem
                    key={category.categoryId}
                    post={category}
                    type="category"
                  />
                </div>
              ))
            ) : (
              <h4>No categories found</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
