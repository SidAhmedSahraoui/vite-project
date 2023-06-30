import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { URL as Api } from "../../../utils/api";
import Circle from "./circle";
import CategoryTypeChart from "./CategoryTypeChart";
const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [adminCount, setAdminCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);
  const [providers, setProviders] = useState(0);
  const [hiring, setHiring] = useState(0);
  const [study, setStudy] = useState(0);

  useEffect(() => {
    fetch(`${Api}/auth-service/admin/count/${3}`)
      .then(response => response.json())
      .then(data => setAdminCount(data)) // Assume the endpoint returns an object with a count property
      .catch(error => console.error(error));

    fetch(`${Api}/auth-service/admin/count/${1}`)
      .then(response => response.json())
      .then(data => setNormalCount(data))
      .catch(error => console.error(error));

    fetch(`${Api}/auth-service/admin/count/${2}`)
      .then(response => response.json())
      .then(data => setProviders(data))
      .catch(error => console.error(error));

    fetch(`${Api}/auth-service/admin/count/${4}`)
      .then(response => response.json())
      .then(data => setHiring(data))
      .catch(error => console.error(error));

    fetch(`${Api}/auth-service/admin/count/${5}`)
      .then(response => response.json())
      .then(data => setStudy(data))
      .catch(error => console.error(error));
  }, []);
  return (
    <>
      <div className={classes.page}>
        <h3>Dashboard</h3>
        <div className="content">
          <div className="chart">
            <Circle
              adminCount={adminCount}
              normalCount={normalCount}
              providers={providers}
            />
            <h6 className="title">Users Type Distribution</h6>
          </div>
          <div className="chart">
            <CategoryTypeChart hiring={hiring} study={study} />
            <h6 className="title">Categories Type Distribution</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
