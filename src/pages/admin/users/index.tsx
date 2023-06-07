import React from "react";
import useStyles from "./style";
const Users: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <h3>Users</h3>
      </div>
    </>
  );
};

export default Users;
