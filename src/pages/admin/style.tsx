import { createUseStyles } from "react-jss";

import colors from "../../styling/colors";

const useStyles = createUseStyles({
  page: {
    padding: "0px",
    backgroundColor: colors["text-gray-300"],
    borderTop: `1px solid ${colors["text-gray-600"]}`,

    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    "& .content": {
      width: "fit-content",
      height: "100vh",
      padding: "20px",
      display: "flex",
    },
  },
});

export default useStyles;
