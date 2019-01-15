import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navs from "./components/Nav"
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";





function App() {
  return (
    <Router>
      <div>
        <Navs />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/account" component={Account} />


        hello this is a test
      </div>
    </Router>
  );
}

export default App;
