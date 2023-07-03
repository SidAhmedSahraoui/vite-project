import React from "react";
import useStyles from "../../style";
import { Link } from "react-router-dom";
import Home from "../../../../assets/images/page.svg";
const Inter: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageCategories}>
      <div className="categories">
        <div className="group-link">
          <Link to="/interviews/show/1" className="link">
            <button className="button-primary">Entretien Campus France</button>
          </Link>
          <Link to="/interviews/show/4" className="link">
            <button className="button-primary">Study in Canada</button>
          </Link>
          <Link to="/interviews/show/5" className="link">
            <button className="button-primary">Study in Turkey</button>
          </Link>
        </div>
        <div className="category">
          <img src={Home} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Inter;
