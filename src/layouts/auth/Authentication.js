import React, { useState } from "react";
import {
  useMediaQuery,
  makeStyles,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

import * as authAction from "../../store/action/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    ...theme.typography.h1,
  },
}));

const Authentication = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    await dispatch(authAction.login(email, password));
    // console.log(email);
    // alert(email + " " + password);
  };

  const error = useSelector((state) => state.auth.error);

  let errorMessage = null;

  if (error) {
    errorMessage = <Alert severity="error">{error}</Alert>;
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        item
        xs={3}
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <div>
          {errorMessage}
          <div style={{ marginTop: 8 }} />
          <Typography variant="h2" align="center">
            Sign In
          </Typography>
          <Typography variant="h5" align="center" style={{ marginTop: "8px" }}>
            Nectar App
          </Typography>
          <FormControl style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              inputMode="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginTop: "8px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              inputMode="text"
              required
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitHandler(event);
                }
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            style={{ marginTop: "16px" }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={(event) => submitHandler(event)}
          >
            Sign In
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;
