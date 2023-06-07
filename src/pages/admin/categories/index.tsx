import React from "react";
import useStyles from "./style";
const Categories: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Categories</h3>
      </div>
    </>
  );
};

export default Categories;
