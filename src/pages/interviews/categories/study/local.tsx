import React from "react";
import useStyles from "../../style";
import { Link } from "react-router-dom";
import Home from "../../../../assets/images/page.svg";
const Local: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageCategories}>
      <div className="categories">
        <div className="group-link">
          <Link to="/interviews/show/6" className="link">
            <button className="button-primary">
              Ecole supérieure de l'hôtellerie et la restauration
            </button>
          </Link>
          <Link to="/interviews/show/7" className="link">
            <button className="button-primary">
              Ecole supérieure de tourisme
            </button>
          </Link>
          <Link to="/interviews" className="link">
            <button className="button-primary">Autre</button>
          </Link>
        </div>
        <div className="category">
          <img src={Home} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Local;
