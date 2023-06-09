import React from "react";
import useStyles from "./style";

const Services: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <h1>Services</h1>
    </div>
  );
};

export default Services;
