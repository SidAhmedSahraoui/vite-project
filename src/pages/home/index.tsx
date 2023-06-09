import Helmet from "react-helmet";
import { Link } from "react-router-dom";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import TextLoop from "react-text-loop";
// Images
import Home1 from "../../assets/images/Home.svg";
import useStyles from "./home";
import { Card } from "react-bootstrap";
import home from "../../assets/images/home.svg";
import Interview from "../../assets/interview.png";
import Consulting from "../../assets/consulting.png";
import Sharing from "../../assets/sharing.png";

import { useAppSelector } from "../../redux/hooks";
const Home = () => {
  const classes = useStyles();

  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Donations website`}</title>
      </Helmet>
      <div className={`${classes.page}`}>
        <header className="row align-items-center">
          <div className="header-container ">
            <div className="col-12 col-lg-6 text-center text-lg-left">
              <h1 className="title mx-auto mx-lg-0 ">
                {`
              S'entraîner aux entretiens,
              consulter des expert,
              et prendre  des expériences
               des gens prospères`}
              </h1>

              <TextLoop
                springConfig={{ stiffness: 180, damping: 16 }}
                mask={true}
                className="text-left"
                interval={2500}
              >
                <p className="paragraph">
                  “Notre plateforme vous aide à <span>reussir</span> <br />{" "}
                  votre carriere !"
                </p>
                <p className="paragraph">
                  "Entrepreneuriat, <span>obtenir un job</span>, <br />{" "}
                  procedure d'etude a l'etranger"
                </p>
                <p className="paragraph">
                  "Bénéficiez des conseils, des informations et des <br />
                  <span>expériences d'entrepreneurs</span>, d'étudiants ..."
                </p>
              </TextLoop>
              <br />
              {!isAuthenticated && (
                <Link to="/register" className="button-primary">
                  <span>{`Inscrit vous `}</span>
                </Link>
              )}
            </div>
            <div className="col-12 col-lg-6 text-center">
              <img
                className="img img-fluid"
                height="450px !important"
                width="400px !important"
                src={Home1}
                alt="Home"
              />
            </div>
          </div>
        </header>

        <div className="features flex">
          <Card className="card">
            <div className="logo-card">
              <img src={Interview} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Preparation aux Entretiens</h4>
            <p className="text-card">
              Preparez-vous aux entretiens Avec des professionnels expérimentés
            </p>
            <Link to="/interviews" className="link-card">
              <span>Prendre RDV</span>
            </Link>
          </Card>
          <Card className="card">
            <div className="logo-card">
              <img src={Consulting} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Consultation en ligne</h4>
            <p className="text-card">
              Entrepreneuriat, obtenir un job,
              <br />
              {"procedure d'etude a l'etranger"}
            </p>
            <Link to="/interviews" className="link-card">
              <span>Prendre RDV</span>
            </Link>
          </Card>
          <Card className="card">
            <div className="logo-card">
              <img src={Sharing} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Prendre l’experience</h4>
            <p className="text-card">
              {"Bénéficiez des conseils, des informations et\n" +
                "des expériences d'entrepreneurs, d'étudiants"}
            </p>
            <Link to="/interviews" className="link-card">
              <span>Prendre RDV</span>
            </Link>
          </Card>
        </div>
        <div className="about-us">
          <Link to="/suivi" className="button-primary">
            <span>{`Suivi personnalisé`}</span>
          </Link>
        </div>
        <div className="home-img">
          <img src={home} alt="home" />
        </div>
      </div>
    </>
  );
};

export default Home;
