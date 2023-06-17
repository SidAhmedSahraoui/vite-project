import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    "& .content": {
      width: "fit-content",
      height: "100vh",
      padding: "20px",
      display: "flex",
    },
  },
});

export default useStyles;
