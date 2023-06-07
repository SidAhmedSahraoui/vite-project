import React from "react";
import useStyles from "./style";
const Providers: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Providers</h3>
      </div>
    </>
  );
};

export default Providers;
