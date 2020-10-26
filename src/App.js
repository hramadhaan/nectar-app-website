import React, { Suspense, useEffect, useCallback } from "react";
import {
  Route,
  withRouter,
  Switch as SwitchDom,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./hoc/Layout";
import * as userAction from "./store/action/auth";

const Auth = React.lazy(() => {
  return import("./layouts/auth/Authentication");
});

const AddCategory = React.lazy(() => {
  return import("./layouts/category/AddCategory");
});

const Dashboard = React.lazy(() => {
  return import("./layouts/dashboard/Dashboard");
});

const App = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.token !== null);

  const onTryAutoSignUp = useCallback(() => {
    dispatch(userAction.authCheckState());
  });
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <SwitchDom>
      <Route path="/auth" exact render={(props) => <Auth />} />
      <Redirect to="/auth" />
    </SwitchDom>
  );

  if (isAuth) {
    routes = (
      <SwitchDom>
        <Route path="/add-category" exact render={(props) => <AddCategory />} />
        <Route path="/" exact render={(props) => <Dashboard />} />
        <Redirect to="/" />
      </SwitchDom>
    );
  }

  return (
    <div>
      <Layout isAuthentication={isAuth}>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
