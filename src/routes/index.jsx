import { Route, Switch } from "react-router";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Signin from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Doit:token"));
    if (token) return setAuthenticated(true);
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route exact path="/Signup">
        <Signin authenticated={authenticated} />
      </Route>
      <Route exact path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  );
};

export default Routes;
