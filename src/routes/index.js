import { Route, Switch } from "react-router";
import SignUp from "../components/SignUp";
import LoginPage from "../pages/Login";
import Homepage from "../pages/Homepage/index";
import Groups from "../pages/Groups";
import Dashboard from "../pages/Dashboard";
import { useState, useEffect } from "react";
import Welcome from "../pages/Welcome";
import GroupDetails from "../pages/GroupDetails";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@BetterLife:token");
    token && setAuthenticated(true);
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Homepage authenticated={authenticated} />
      </Route>

      <Route exact path="/login">
        <LoginPage
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <Route path="/welcome">
        <Welcome authenticated={authenticated} />
      </Route>

      <Route exact path="/signup">
        <SignUp authenticated={authenticated} />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <Route exact path="/groups">
        <Groups
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <Route exact path="/groups/:idGroup">
        <GroupDetails
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
