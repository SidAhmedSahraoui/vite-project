import { createUseStyles } from "react-jss";
import { CARD_SHADOW } from "../../styling/styling";

const useStyles = createUseStyles({
  page: {
    padding: "40px",
    margin: "40px auto",
    width: "80%",
    ...CARD_SHADOW,
  },
});

export default useStyles;
