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
const Home = () => {
  const classes = useStyles();

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
                className="text-left mt-2"
                interval={2500}
              >
                <p className="paragraph mx-auto mx-lg-0 mt-3">
                  “Notre plateforme vous aide à <span>reussir</span> <br />{" "}
                  votre carriere !"
                </p>
                <p className="paragraph mx-auto mx-lg-0 mt-3">
                  "Entrepreneuriat, <span>obtenir un job</span>, <br />{" "}
                  procedure d'etude a l'etranger"
                </p>
                <p className="paragraph mx-auto mx-lg-0 mt-3">
                  "Bénéficiez des conseils, des informations et des <br />
                  <span>expériences d'entrepreneurs</span>, d'étudiants ..."
                </p>
              </TextLoop>
              <br />
              <Link to="/register" className="button-primary">
                <span>{`Inscrit vous `}</span>
              </Link>
            </div>
            <div className="col-12 col-lg-6 mt-lg-5 mt-5 mt-lg-0 text-center">
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
              <img src={Home1} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Preparation aux Entretiens</h4>
            <p className="text-card">
              Preparez-vous aux entretiens Avec des professionnels expérimentés
            </p>
            <Link to="/" className="link-card">
              <span>Prendre RDV</span>
            </Link>
          </Card>
          <Card className="card">
            <div className="logo-card">
              <img src={Home1} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Consultation en ligne</h4>
            <p className="text-card">
              Entrepreneuriat, obtenir un job,
              <br />
              {"procedure d'etude a l'etranger"}
            </p>
            <Link to="/" className="link-card">
              <span>Prendre RDV</span>
            </Link>
          </Card>
          <Card className="card">
            <div className="logo-card">
              <img src={Home1} alt="logo" className="h-16 w-16" />
            </div>
            <h4 className="title-card">Prendre l’experience</h4>
            <p className="text-card">
              {"Bénéficiez des conseils, des informations et\n" +
                "des expériences d'entrepreneurs, d'étudiants"}
            </p>
            <Link to="/" className="link-card">
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
