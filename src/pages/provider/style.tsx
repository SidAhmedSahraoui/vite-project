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
    maxWidth: "1020px",
    margin: "0 auto",
    marginTop: "35px",
    "&.card-shadow": CARD_SHADOW,
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
      width: "90%",
      margin: "0 auto",
      "& .post-title": {
        fontSize: "24px",
        fontWeight: "600",
        color: colors["text-gray-700"],
        textAlign: "start",
        marginBottom: "25px",
        marginTop: "25px",
      },
      "& .posts-sub-title": {
        fontSize: "16px",
        fontWeight: "500",
        textAlign: "start",
        alignSelf: "flex-start",
      },
      "& .posts": {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        marginBottom: "25px",

        "& .postitem": {
          ...BUTTON_PRIMARY_OUTLINE,
          cursor: "pointer",
          color: colors["text-gray-900"],
          fontWeight: "700",
          margin: "8px 0px !important",
          "&:hover": {
            background: colors["text-gray-500"],
          },
          "&.active": {
            background: colors["text-gray-500"],
          },
        },
      },
      "& .work-shift": {
        display: "flex",
        flexDirection: "row",
        width: "80%",
        margin: "0 auto",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& .form-group": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          "& .input-label": {
            fontSize: "16px",
            fontWeight: "600",
          },
          "& .custom-select": {
            ...BUTTON_PRIMARY_OUTLINE,
            color: colors["text-gray-900"],
            "&:hover": {
              color: colors["text-gray-900"],
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
      "& .button-primary-outline": {
        ...BUTTON_PRIMARY_OUTLINE,
        "&:hover": {
          background: colors["primary"],
          color: colors["text-white"],
        },
      },
      "& .button-light": BUTTON_LIGHT,
      "& .button-gray": BUTTON_PRIMARY,
      "& .button-danger": BUTTON_DANGER,
      "& .input-select": {
        height: "auto",
        background: "none",
      },

      "& .link-primary": LINK_PRIMARY,
      "& .section": {
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
