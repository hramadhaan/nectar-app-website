import React, { useState } from "react";
import { makeStyles, CssBaseline, Toolbar } from "@material-ui/core";

import Aux from "../hoc/Aux";
import Appbar from "../components/Appbar";
import Drawer from "../components/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const { isAuthentication } = props;
  const classes = useStyles();

  let routes;

  if (isAuthentication) {
    routes = (
      <div className={classes.root}>
        <CssBaseline />
        <Appbar />
        <Drawer />
        <main className={classes.content}>
          <Toolbar />
          {props.children}
        </main>
      </div>
    );
  } else {
    routes = (
      <div>
        <main>{props.children}</main>
      </div>
    );
  }

  return <Aux>{routes}</Aux>;
};

export default Layout;
