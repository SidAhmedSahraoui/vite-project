import { createUseStyles } from "react-jss";
import colors from "../../styling/colors";
import { CARD_SHADOW, INPUT_TEXT, BUTTON_AUTH } from "../../styling/styling";

const useStyles = createUseStyles({
  root: {
    padding: "40px 20px",
    marginBottom: "40px",
    "&.card-shadow": CARD_SHADOW,
    width: "450px",
    margin: "auto",
    marginTop: "50px",
    "& .title": {
      color: colors.primary,
      fontWeight: 800,
      fontSize: "18px",
      lineHeight: "18px",
    },
    "& .subtitle": {
      color: colors["text-gray-700"],
      fontWeight: "400",
    },
    "& .button-primary": BUTTON_AUTH,
    "& .input-text": INPUT_TEXT,
    "& .form-link": {
      "& a": {
        color: colors["text-gray-700"],
        "& span": {
          fontWeight: 500,
        },
      },
    },
  },
});

export default useStyles;
