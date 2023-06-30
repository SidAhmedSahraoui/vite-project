import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    "& .content": {
      width: "100%",
      height: "350px",
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      "& .chart": {
        display: "flex",
        flexDirection: "column",
        marginRight: "20px",
        "& .title": {
          marginTop: "20px",
          textAlign: "center",
        },
      },
    },
  },
});

export default useStyles;
