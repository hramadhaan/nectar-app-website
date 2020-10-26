import React from "react";
import { Grid } from "@material-ui/core";

const Dashboard = (props) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="space-around"
      spacing={0}
      style={{
        height: "100vh",
      }}
    >
      <Grid item md={4}>
        <p>12</p>
      </Grid>
      <Grid item md={4}>
        <p>12</p>
      </Grid>
      <Grid item md={4}>
        <p>12</p>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
