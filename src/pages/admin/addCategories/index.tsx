import React from "react";
import useStyles from "./style";
const AddCategories: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Add Categories</h3>
      </div>
    </>
  );
};

export default AddCategories;
