import { createUseStyles } from "react-jss";
import { BUTTON_DANGER, CARD_SHADOW } from "../../../styling/styling";

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
        ...BUTTON_DANGER,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
      },
    },
  },
});

export default useStyles;
