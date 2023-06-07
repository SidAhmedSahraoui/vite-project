import { createUseStyles } from "react-jss";

import {
  BUTTON_PRIMARY_OUTLINE,
  CARD_SHADOW,
  INPUT_TEXT,
} from "../../../styling/styling";

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
      justifyContent: "center",
      "& .form": {
        "& .form-btn": {
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "center",
          "& button": {
            ...BUTTON_PRIMARY_OUTLINE,
          },
        },
        "& .form-group": {
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          alignItems: "flex-start",

          "& label": {
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "600",
          },
          "& input": {
            ...INPUT_TEXT,
          },
          "& select": {
            ...INPUT_TEXT,
            width: "100%",
          },
          "& textarea": {
            ...INPUT_TEXT,
          },
        },
      },
    },
  },
});

export default useStyles;
