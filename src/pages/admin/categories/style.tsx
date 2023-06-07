import { createUseStyles } from "react-jss";

import { CARD_SHADOW } from "../../../styling/styling";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    "& .content": {
      ...CARD_SHADOW,
      width: "80%",
      margin: "auto",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      overflowY: "scroll",
    },
  },
});

export default useStyles;
