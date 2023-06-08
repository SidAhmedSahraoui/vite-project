import { createUseStyles } from "react-jss";

import { CARD_SHADOW } from "../../../styling/styling";
import colors from "../../../styling/colors";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
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
      "& .categories": {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        "& .category": {
          border: `2px solid ${colors["text-gray-300"]}`,
          borderRadius: "5px",
          marginBottom: "10px",
        },
      },
    },
  },
});

export default useStyles;
