import React from "react";
import useStyles from "../../style";
import { Link } from "react-router-dom";
import Home from "../../../assets/images/page.svg";
const Study: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageCategories}>
      <div className="categories">
        <div className="group-link">
          <Link to="/interviews/local" className="link">
            <button className="button-primary">Etudes en algérie</button>
          </Link>
          <Link to="/interviews/inter" className="link">
            <button className="button-primary">Etudes à l'étranger</button>
          </Link>
        </div>
        <div className="category">
          <img src={Home} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Study;
