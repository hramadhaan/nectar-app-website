import React, { useState, useCallback, useEffect } from "react";
import {
  Drawer as DrawerUI,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  ListSubheader,
  Collapse,
  makeStyles,
  Toolbar,
  Grid,
  Avatar,
  Typography,
  Snackbar,
} from "@material-ui/core";
import {
  Notes,
  NoteAdd,
  ShoppingBasket,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  Dashboard,
} from "@material-ui/icons";
import Skeleton from "react-loading-skeleton";
import * as authAction from "../store/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { NavLink, Link, Redirect } from "react-router-dom";
import AddCategory from "../layouts/category/AddCategory";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    ...theme.typography.body2,
  },
}));

const Drawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openKategori, setOpenKategori] = useState(false);
  const [openProduk, setOpenProduk] = useState(false);
  const [isError, setError] = useState(true);

  const name = useSelector((state) => state.auth.profile.name);
  // console.log(name);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };
  // console.log(loading);

  const handleKategoriClick = () => {
    setOpenKategori(!openKategori);
  };

  const handleProdukClick = () => {
    setOpenProduk(!openProduk);
  };

  const submitHandler = useCallback(async (event) => {
    event.preventDefault();
    dispatch(authAction.logout());
  });

  const checkName = useCallback(() => {
    dispatch(authAction.profile());
  });

  useEffect(() => {
    checkName();
  }, [dispatch]);

  let profile = (
    <ListItem button>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        spacing={0}
      >
        <Grid item>
          <Avatar alt={name} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{name}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );

  if (loading) {
    profile = <Skeleton height={58} />;
  }

  console.log(error);

  let errorMessage = null;

  if (error) {
    errorMessage = (
      <>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleErrorClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <DrawerUI
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        {profile}
        {errorMessage}
        <List>
          <ListSubheader>Menu Utama</ListSubheader>
          <ListItem
            button
            onClick={(event) => {
              event.preventDefault();
              return <Link to="/" component={Dashboard} />;
            }}
          >
            <ListItemIcon>
              <Notes />
            </ListItemIcon>
            <ListItemText className={classes.list} primary="Ringkasan" />
          </ListItem>
          <ListItem button onClick={handleKategoriClick}>
            <ListItemIcon>
              <NoteAdd />
            </ListItemIcon>
            <ListItemText primary="Kategori" />
            {openKategori ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openKategori} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push("/add-category")}
              >
                <ListItemText primary="Tambah Kategori" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Lihat Kategori" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleProdukClick}>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Produk" />
            {openProduk ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProduk} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Tambah Produk" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Lihat Produk" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListSubheader>Pengaturan</ListSubheader>
          <ListItem button onClick={(event) => submitHandler(event)}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </DrawerUI>
  );
};

export default Drawer;
