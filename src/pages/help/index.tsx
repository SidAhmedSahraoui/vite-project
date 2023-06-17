import Helmet from "react-helmet";
// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import useStyles from "./style";
const Help = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Donations website`}</title>
      </Helmet>
      <div className={`${classes.page}`}>
        <div className="features flex">
          <div className="row">
            <h4 className="title">About Us</h4>
            <p className="paragraph">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <h4 className="title">Notre vision</h4>
            <p className="paragraph">
              As a platform, our vision is to empower individuals to achieve
              their career and study goals by providing them with the necessary
              resources and support. We aim to create a community of like-minded
              individuals who can learn from each other, share their
              experiences, and help each other succeed. Our focus is on helping
              individuals overcome their anxieties and fears when it comes to
              interviews and providing them with a safe and relaxed environment
              to prepare and practice. We strive to offer valuable insights and
              advice in various fields, including entrepreneurship and studying
              abroad, to help individuals make informed decisions about their
              future. Our ultimate goal is to become a trusted and reliable
              source of support and guidance for individuals who are determined
              to achieve their career and study goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
