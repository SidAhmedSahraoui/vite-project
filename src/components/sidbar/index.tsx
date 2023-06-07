import React, { useState, useEffect } from "react";

import Ad1 from "../../assets/images/ad1.png";
import Ad2 from "../../assets/images/ad2.png";
import Ad3 from "../../assets/images/ad3.png";
import Ad4 from "../../assets/images/ad4.png";

import useStyles from "./style";

const Sidbar: React.FC = () => {
  const classes = useStyles();

  const [ad, setAd] = useState(Ad1);

  const changeAd = () => {
    const random: number = Math.floor(Math.random() * 4) + 1;

    switch (random) {
      case 1:
        setAd(Ad1);
        break;
      case 2:
        setAd(Ad2);
        break;
      case 3:
        setAd(Ad3);
        break;
      case 4:
        setAd(Ad4);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    changeAd();
  }, []);

  return (
    <div className={classes.sidebar}>
      <h6 className="sidebar-title text-right">Sponsored ads</h6>
      <div className="mt-3">
        <img className="img img-fluid" src={ad} alt="Ad" />
      </div>
    </div>
  );
};

export default Sidbar;
