import { createUseStyles } from "react-jss";
import colors from "../../../styling/colors";
import {
  CARD_SHADOW,
  BUTTON_PRIMARY,
  BUTTON_TRANSPARENT,
  INPUT_TEXT,
  BUTTON_LIGHT,
  POSTITEM_CARD,
  LINK_PRIMARY,
  BUTTON_DANGER,
} from "../../../styling/styling";

const useStyles = createUseStyles({
  page: {
    padding: "40px 20px",
    height: "100vh",

    "&.card-shadow": CARD_SHADOW,
    "&> .title": {
      color: colors.primary,
    },
    "& .subtitle": {
      color: colors["text-gray-700"],
      fontWeight: "400",
    },

    "& .card-shadow": CARD_SHADOW,
    "& .search-form": {
      padding: "20px 20px",
      "& .input-text": {
        ...INPUT_TEXT,
        width: "100%",
      },
    },

    "& .button-primary": BUTTON_PRIMARY,
    "& .button-light": BUTTON_LIGHT,
    "& .button-transparent": BUTTON_TRANSPARENT,
    "& .button-danger": BUTTON_DANGER,

    "& .row-bottom": {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: "20px",
      gap: "20px",
    },
    "& .btns": {
      width: "20%",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: "20px",
      marginLeft: "80%",
      textAlign: "end",
    },
    "& .input-select": {
      height: "auto",
      background: "none",
    },
    "@media screen and (min-width: 992px)": {
      "& .collapse": { display: "block" },
    },

    "& .content": {
      padding: "20px",
      "& .posts": {
        width: "100% !important",
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        "& .postitem-card": {
          ...POSTITEM_CARD,
          border: `2px solid ${colors["text-gray-400"]}`,
          backgroundColor: colors["text-gray-100"],
          "&:hover": {
            ...CARD_SHADOW,
            backgroundColor: colors["text-gray-200"],
            cursor: "pointer",
          },
          width: "fit-content",
          maxWidth: "550px",
          "& .line-top": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          },
          "& .postitem-details-top": {
            "& h5.title": {
              color: colors["text-gray-800"],
            },
            "& p.description": {
              color: colors["text-gray-600"],
              fontWeight: 500,
              fontSize: "15px",
            },
          },
          "& .postitem-details-bottom": {
            "& p.location": {
              color: colors["text-gray-700"],
              fontWeight: 500,
              fontSize: "15px",
            },
            "& p.date": {
              color: colors["text-gray-600"],
              fontSize: "15px",
            },
          },
        },
        "& .no-requests": {
          "& p": {
            color: colors["text-gray-500"],
            fontWeight: "400",
          },
        },
      },
    },
    "& .link-primary": LINK_PRIMARY,
    "& .post-content": {
      "& .title": {
        fontWeight: 600,
        color: colors.primary,
        "& .status": {
          fontWeight: 500,
          fontSize: "15px",
          color: colors["text-gray-900"],
        },
      },
      "& .description": {
        maxWidth: "700px",
        fontWeight: 400,
        color: colors["text-gray-700"],
        "& .subtitle": {
          fontWeight: 600,
        },
      },
      "& .date": {
        fontSize: ".9rem",
        fontWeight: 500,
        color: colors["text-gray-500"],
      },
      "& .pictures": {
        "& img": {
          cursor: "pointer",
        },
      },
      "& .contact-details": {
        "& .icon": {
          color: colors["text-gray-700"],
          fontSize: "28px",
        },
        "& .title": {
          fontWeight: 600,
          color: colors["text-gray-700"],
        },
      },
      "& .button-primary, & .button-transparent": {
        padding: "15px 30px !important",
        borderRadius: "18px",
      },
    },
    "& .add-form": {
      maxWidth: "520px",
      "& .input-text": {
        ...INPUT_TEXT,
        width: "100%",
      },
      '& [type="file"]': {
        display: "none",
        "& + label": {
          fontWeight: 600,
          background: colors["text-gray-100"],
          padding: "15px 30px",
          "&:hover": {
            background: colors["text-gray-300"],
          },
        },
      },
    },
    "&.user-posts": {
      "& .table": {
        minWidth: "750px",
        "& thead th": {
          fontWeight: "600",
          fontSize: "15px",
        },
        "& .type": {
          fontWeight: "600",
          fontSize: "14px",
          padding: "2px 5px",
          borderRadius: "5px",
          color: colors["text-white"],
          "&.request": {
            background: colors.request,
          },
        },
        "& .actions": {
          "& .icon": {
            fontSize: "18px",
            "&.icon-decline": {
              color: colors.danger,
            },
          },
        },
      },
    },
  },
});

export default useStyles;
