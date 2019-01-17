import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navs from "./components/Nav"
import Dashboard1 from "./pages/Dashboard";
import Account from "./pages/Account";

//clays stuff

import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import Landing from "./components/Landing";






function App() {
  return (
    <Router>
      <div>
      {/* <Dashboard /> */}
          <Route exact path="/dashboard" component={Dashboard1} />
          <Route exact path="/account" component={Account} />


        hello this is a test

      {/* <Dashboard />
      <Account /> */}
      <Landing />
    </div>
  </Router>

  );
}

export default App;
