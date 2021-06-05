import { Route, Switch } from "react-router";
import Home from "../pages/Home";
import Signin from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/Signup">
        <Signin />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Routes;
