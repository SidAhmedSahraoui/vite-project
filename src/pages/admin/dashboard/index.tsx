import React from "react";
import useStyles from "./style";
const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Dashboard</h3>
      </div>
    </>
  );
};

export default Dashboard;
