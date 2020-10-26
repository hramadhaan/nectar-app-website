import { createMuiTheme } from "@material-ui/core";

import Colors from "../constants/Colors";

export default createMuiTheme({
  palette: {
    common: {
      black: Colors.black,
      red: Colors.red,
      green: Colors.green,
      yellow: Colors.yellow,
    },
    primary: {
      main: Colors.primary,
    },
    success: {
      main: Colors.green,
    },
    error: {
      main: Colors.red,
    },
    warning: {
      main: Colors.yellow,
    },
    text: {
      primary: Colors.black,
    },
  },
  typography: {
    h1: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "56px",
      lineHeight: "60px",
      letterSpacing: "0.4px",
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "46px",
      letterSpacing: "0.2px",
    },
    h3: {
      fontFamily: "Montserrat",
      fontSize: "28px",
      lineHeight: "34px",
      letterSpacing: "0.2px",
    },
    h4: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "26px",
      lineHeight: "34px",
      letterSpacing: "0.2px",
    },
    h5: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "26px",
      letterSpacing: "0.2px",
    },
    h6: {
      fontFamily: "Montserrat",
      fontSize: "18px",
      lineHeight: "24px",
      letterSpacing: "0.1px",
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.1px",
    },
    subtitle2: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    body1: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.1px",
    },
    body2: {
      fontFamily: "Montserrat",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    button: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "13px",
      lineHeight: "16px",
      letterSpacing: "1.0px",
      textTransform: "none",
    },
    caption: {
      fontFamily: "Montserrat",
      fontSize: "13px",
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
  },
});
