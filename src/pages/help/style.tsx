import { createUseStyles } from "react-jss";
import colors from "../../styling/colors";
import { BUTTON_PRIMARY } from "../../styling/styling";

const useStyles = createUseStyles({
  page: {
    padding: "0px",
    marginBottom: "40px",
    backgroundColor: colors["text-white"],
    "& header": {
      backgroundColor: "rgb(202, 246, 249, 0.33)",
      padding: "0px 40px",
      height: "440px",
      "& .header-container": {
        width: "80%",
        margin: "0px auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      },
    },
    "& h1.title": {
      color: colors["text-gray-800"],
      fontWeight: "600",
      lineHeight: "42px",
      fontSize: "36px",
      width: "100%",
      margin: "0px",
      maxWidth: "500px",
    },
    "& .button-primary": {
      ...BUTTON_PRIMARY,
    },

    "@media screen and (max-width: 576px)": {
      "& h1.title": {
        fontSize: "2rem",
      },
    },

    "& .paragraph": {
      color: colors["text-gray-600"],
      fontWeight: "500",
      fontSize: "1.3rem",
      "& span": {
        fontWeight: "700",
        color: colors["text-gray-700"],
      },
    },

    "& h3.title": {
      color: colors["text-gray-800"],
      fontWeight: "500",
      maxWidth: "250px",
      position: "relative",
      "& .bold": {
        fontWeight: "700",
      },
    },
    "& .about-us": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& .button-primary": {
        ...BUTTON_PRIMARY,
      },
    },
    "& .home-img": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "40px",
    },

    "& .features": {
      "& .title": {
        color: colors["text-gray-800"],
        fontWeight: "600",
      },
      "& .description": {
        color: colors["text-gray-600"],
        fontWeight: "400",
        maxWidth: "300px",
      },
    },

    "& .our-mission": {
      "& .paragraph": {
        fontSize: "1.1rem",
      },
    },

    "@media screen and (min-width: 992px)": {
      "& h3.title": {
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: 13,
          width: "50px",
          display: "inline",
          borderTop: `3px solid ${colors["text-gray-400"]}`,
        },
      },

      "& .features": {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        "& .title": {
          width: "65%",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: 400,
          lineHeight: "46px",
          marginTop: "100px",
          marginBottom: "60px",
        },
        "& .row": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: "40px",
          "& .paragraph": {
            width: "80% !important",
            height: "fit-content !important",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "30px",
            color: colors["text-gray-900"],
          },
          "& .img": {
            width: "295px",
            height: "295px",
          },
        },
        "& .card": {
          width: "350px",
          height: "240px",
          padding: "0px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgb(172, 172, 172,0.6)",
          position: "relative",
          bottom: "45px",
          zIndex: "40",
          "& .logo-card": {
            width: "full",
            height: "45%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(242, 231, 254, 1)",
            "& img": {
              width: "100px",
              height: "60px",
            },
          },
          "& .title-card": {
            fontSize: "16px",
            fontWeight: "600",
            marginTop: "10px",
            lineHeight: "20px",
            textAlign: "center",
            color: colors.primary,
          },
          "& .text-card": {
            fontSize: "13px",
            fontWeight: "400",
            color: colors["text-gray-800"],
            lineHeight: "15px",
            textAlign: "center",
            width: "90%",
            margin: "auto",
            marginBottom: "12px",
          },
          "& .link-card": {
            ...BUTTON_PRIMARY,
            width: "fit-content",
            margin: "auto",
            marginBottom: "20px",
          },
        },
        "& h3.title": {
          "&:after": {
            right: -70,
          },
        },
      },

      "& .our-mission": {
        "& h3.title": {
          "&:after": {
            right: 0,
          },
        },
      },
    },
  },
});

export default useStyles;
