import { createUseStyles } from "react-jss";
import { BUTTON_GRAY, CARD_SHADOW } from "../../../styling/styling";
import colors from "../../../styling/colors";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    "& .content": {
      ...CARD_SHADOW,
      width: "100%",
      margin: "auto",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      overflowY: "scroll",
      "& .button-primary": {
        ...BUTTON_GRAY,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
      },
      "& .btn-admin": {
        ...BUTTON_GRAY,
        color: colors.success,
      },
      "& .btn-provider": {
        ...BUTTON_GRAY,
        color: colors.danger,
      },
      "& .btn-user": {
        ...BUTTON_GRAY,
        color: colors["text-gray-900"],
      },
    },
  },
});

export default useStyles;
