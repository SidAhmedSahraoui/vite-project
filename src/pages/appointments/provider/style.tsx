import { createUseStyles } from "react-jss";
import colors from "../../../styling/colors";
import {
  CARD_SHADOW,
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINE,
  INPUT_TEXT,
  BUTTON_LIGHT,
  LINK_PRIMARY,
  BUTTON_DANGER,
} from "../../../styling/styling";

const useStyles = createUseStyles({
  page: {
    padding: "40px 20px",
    marginBottom: "40px",
    margin: "0 auto",
    backgroundColor: colors["text-gray-400"],
    height: "100vh",
    "& .card-shadow": { ...CARD_SHADOW, padding: "35px 25px" },
    "& .head": {
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
      "& .container": {
        "& .card-group": {
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          "& .card": {
            minWidth: "360px !important",
            borderRadius: "8px",
            border: `2px solid ${colors["text-gray-300"]}`,
            boxShadow: "8px 12px 16px 0 rgba(0,0,0,0.1)",
            backgroundColor: colors["text-gray-200"],
            "& .card-body": {
              textAlign: "left",
              "& .btns": {
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexWrap: "nowrap",
              },
            },
          },
        },
      },
      "& .button-primary": {
        ...BUTTON_PRIMARY,
        "&:hover": {
          background: colors["primary-hover"],
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
