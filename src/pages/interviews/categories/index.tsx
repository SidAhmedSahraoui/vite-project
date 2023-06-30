import React from "react";
import useStyles from "../style";
import { Link } from "react-router-dom";
import Home from "../../../assets/images/page.svg";
const Categories: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageCategories}>
      <div className="categories">
        <div className="group-link">
          <Link to="/interviews/study" className="link">
            <button className="button-primary">
              Entretiens d'admission universitaire
            </button>
          </Link>
          <Link to="/interviews/training" className="link">
            <button className="button-primary">Entretiens de stages</button>
          </Link>
          <Link to="/interviews/part-time" className="link">
            <button className="button-primary">
              Entretiens de travail à temps partiel
            </button>
          </Link>
          <Link to="/interviews/hiring" className="link">
            <button className="button-primary">
              Entretiens de recruitment
            </button>
          </Link>
        </div>
        <div className="category">
          <img src={Home} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
