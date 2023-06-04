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
      width: "fit-content",
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
