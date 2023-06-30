import { createUseStyles } from "react-jss";
import colors from "../../../styling/colors";

const useStyles = createUseStyles({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "280px",
    height: "100vh",
    margin: "0px",
    backgroundColor: colors["text-gray-100"],
    borderRight: `1px solid ${colors["text-gray-600"]}`,

    "& .link": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "80%",
      padding: "12px 20px",
      margin: "5px 3px",
      color: colors.primary,
      "& span": {
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "14px",
        marginLeft: "20px",
      },
      "& .icon": {
        width: "22px",
        height: "22px",
      },
      "&:hover, &:focus, &:active": {
        backgroundColor: "rgb(76, 76, 240, 0.3)",
        borderRadius: "10px",
      },
    },
  },
});

export default useStyles;
