import React from "react";
import useStyles from "./style";
import NavSidbar from "./components/navigationSidbar";
import Sidbar from "../../components/sidbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Users from "./users";
import Providers from "./providers";
import AddProvider from "./addProvider";
import Categories from "./categories";
import AddCategories from "./addCategories";
const Admin: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className="col p-0">
        <NavSidbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/add-provider" element={<AddProvider />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategories />} />

          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <div className="col-12 col-lg-3">
        <Sidbar />
      </div>
    </div>
  );
};

export default Admin;
