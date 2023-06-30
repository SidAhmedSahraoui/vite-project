import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    "& .content": {
      width: "100%",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      "& .chart": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "20px",
        "& .title": {
          marginTop: "20px",
        },
      },
    },
  },
});

export default useStyles;
