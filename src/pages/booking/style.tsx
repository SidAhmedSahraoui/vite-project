import { createUseStyles } from "react-jss";
import colors from "../../styling/colors";
import {
  CARD_SHADOW,
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINE,
  INPUT_TEXT,
  BUTTON_LIGHT,
  LINK_PRIMARY,
  BUTTON_DANGER,
} from "../../styling/styling";

const useStyles = createUseStyles({
  page: {
    padding: "40px 20px",
    marginBottom: "40px",
    margin: "0 auto",
    marginTop: "35px",
    "&.card-shadow": {
      ...CARD_SHADOW,
      margin: "20px auto",
      height: "80vh",
      width: "80%",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "start",
    },
    "& .head": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      "& .ProgressRoot": {
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors["text-gray-200"],
        border: `1px solid ${colors["text-gray-400"]}`,
        borderRadius: "99999px",
        width: "900px",
        margin: "0 auto",
        height: "10px",
        transform: "translateZ(0)",
      },

      "& .ProgressIndicator": {
        backgroundColor: "rgb(76, 76, 240)",
        height: "100%",
        transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
      },
      "&> .title": {
        color: colors.primary,
        fontSize: "24px",
        fontWeight: "600",
      },
      "& .subtitle": {
        color: colors["text-gray-700"],
        fontWeight: "400",
      },
    },

    "& .content": {
      width: "100%",
      "& .button-primary": {
        ...BUTTON_PRIMARY,
        "&:hover": {
          background: colors["primary-hover"],
        },
      },
      "& .col-form": {
        "& .form-group": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          "& label": {
            width: "20%",
            textAlign: "left",
            fontWeight: "600",
            fontSize: "16px",
          },
          "& .form-control": {
            ...INPUT_TEXT,
            width: "fit-content",
          },
          "& .form-control-file": {
            width: "250px",
          },
        },
        "& .row-container": {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          flexDirection: "row",
          flexWrap: "nowrap",
          "& .accordion": {
            width: "540px",
            padding: "25px 28px",
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "4px",
            "& .item": {
              "& .sub-item": {
                border: "1px solid rgba(224, 224, 224, 1)",
                width: "100%",
                margin: "0px",
                padding: "5px",
                fontWeight: "400",
                fontSize: "16px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "end",
                "& h5": {
                  fontSize: "16px",
                  fontWeight: 600,
                  marginRight: "24px",
                  marginBottom: "0px",
                },
                "& img": {
                  width: "32px",
                  height: "24px",
                },
                "& .form": {
                  width: "100%",
                  margin: "0px",
                  "& .input-group": {
                    alignItems: "center",
                    "& .input-text": {
                      ...INPUT_TEXT,
                      width: "100%",
                      marginBottom: "20px",
                      color: colors["text-gray-900"],
                    },
                    "& .input-file": {
                      ...INPUT_TEXT,
                      background: colors["text-gray-300"],
                      width: "100%",
                      marginBottom: "20px",
                    },
                  },
                },
              },
            },
          },
          "& .paper": {
            backgroundColor: "rgb(245, 245, 245)",
            border: "1px solid rgba(224, 224, 224, 1)",
            padding: "25px 28px",
            textAlign: "left",
            margin: "0px 10px",
          },
        },
        "& input textarea button": {
          all: "unset",
          boxSizing: "border-box",
        },

        "& .FormRoot": {
          width: "80%",
          margin: "0 auto",
        },

        "& .FormField": {
          display: "grid",
          width: "100%",
          marginBottom: "10px",
        },

        "& .FormLabel": {
          fontSize: "18px",
          fontWeight: "700",
          lineHeight: "35px",
          width: "350px !important",
          textAlign: "left",
          color: colors["text-gray-900"],
        },

        "& .Textarea": {
          ...INPUT_TEXT,
          width: "100%",
          height: "215px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          border: `1px solid ${colors["text-gray-600"]}`,
          fontSize: "15px",
          color: "white",
          boxShadow: `0 0 0 1px ${colors["text-gray-600"]}`,
        },
        "& .Input": {
          ...INPUT_TEXT,
          border: `1px solid ${colors["text-gray-600"]}`,
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          fontSize: "15px",
          color: "white",
          boxShadow: `0 0 0 1px ${colors["text-gray-600"]}`,
        },
      },
      "& .button-primary-outline": BUTTON_PRIMARY_OUTLINE,
      "& .button-light": BUTTON_LIGHT,
      "& .button-gray": BUTTON_PRIMARY,
      "& .button-danger": BUTTON_DANGER,
      "& .input-select": {
        height: "auto",
        background: "none",
      },

      "& .link-primary": LINK_PRIMARY,
      "& .basic-info": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        "& .btn-primary": {
          ...BUTTON_PRIMARY,
        },
        "& .btn-secondary": {
          ...BUTTON_PRIMARY_OUTLINE,
        },
        "& .btn": {
          marginLeft: "40px",
        },
      },
      "& .pick": {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "stretch",
        alignContent: "stretch",
        width: "100%",
        margin: "0px",
        "& .slots": {
          width: "55%",
          "& .tab-list": {
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexDirection: "row",
            marginBottom: "20px",
            "& .page": {
              ...BUTTON_DANGER,
            },
          },
          "& .radio-group": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            maxHeight: "350px",
            alignItems: "stretch",
            overflowX: "hidden",
            "& .radio-option": {
              ...BUTTON_PRIMARY_OUTLINE,
              marginBottom: "12px",
              marginRight: "12px",
              cursor: "pointer",
            },
            "& .bg-selected": {
              background: colors["text-gray-400"],
            },
            "& .bg-not-selected": {
              background: colors["text-gray-100"],
            },
          },
        },
        "& .days": {
          backgroundColor: colors["text-gray-300"],
          borderRadius: "8px",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          padding: "20px 40px",
          "& .card": {
            width: "fit-content",
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "5px",
            background: colors["primary"],
            color: colors["text-gray-700"],
            fontWeight: "600",
            cursor: "pointer",
            "&.active": {
              background: colors["primary-hover"],
            },
          },
        },
      },

      "& .section": {
        margin: "40px 25px",
        "& .title": {
          fontSize: "18px",
          color: colors.primary,
        },
        "& form": {
          "& .input-text": {
            ...INPUT_TEXT,
            width: "100%",
          },
        },
      },
    },
  },
});

export default useStyles;
