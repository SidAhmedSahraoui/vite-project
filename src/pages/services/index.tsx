import Helmet from "react-helmet";
import { Link } from "react-router-dom";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import TextLoop from "react-text-loop";
// Images
import Home1 from "../../assets/images/Home.svg";
import useStyles from "./style";
import Home from "../../assets/images/Home.svg";
import { useAppSelector } from "../../redux/hooks";

const Services = () => {
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
          <p className="title">
            Preparez-vous aux entretiens Avec des professionnels expérimentés
          </p>
          <div className="row">
            <img className="img img-fluid" src={Home} alt="Home" />
            <p className="paragraph">
              Les entretiens occupent une place importante dans le parcours
              professionnel et académique. La compréhension théorique des
              questions d'entrevue seule peut ne pas suffire lorsque vous êtes
              confronté à une entrevue réelle. Il est courant que l'anxiété
              dépasse nos performances lors des entretiens d'embauche, même
              lorsque nous étudions à l'étranger.
              <br />
              Notre service vous offre la possibilité de participer à des
              entretiens fictifs, vous donnant la plate-forme nécessaire pour
              préparer, pratiquer et acquérir une expérience de première main
              d'un entretien d'embauche réel ou d'un entretien d'études à
              l'étranger. S'acclimater à l'environnement d'entretien dans une
              atmosphère détendue et sans stress offre un avantage concurrentiel
              sur vos pairs.
              <br />
              Ce service est basé sur la conviction que la pratique et la
              préparation régulières sont essentielles pour surmonter l'anxiété
              lors d'un entretien, en particulier lors d'études à l'étranger.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
