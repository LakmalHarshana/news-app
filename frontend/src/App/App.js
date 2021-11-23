import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute";
import "./App.css";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
require("dotenv").config();

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/blog" component={Dashboard} />
          <PrivateRoute exact path="/blog/:id" component={Dashboard} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
