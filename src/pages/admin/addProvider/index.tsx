import React from "react";
import useStyles from "./style";
const addProvider: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Add Provider</h3>
      </div>
    </>
  );
};

export default addProvider;
