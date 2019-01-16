import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navs from "./components/Nav"
import Dashboard1 from "./pages/Dashboard";
import Account from "./pages/Account";





function App() {
  return (
    <Router>
      <div>
      {/* <Dashboard /> */}
          <Route exact path="/dashboard" component={Dashboard1} />
          <Route exact path="/account" component={Account} />


        hello this is a test
      </div>
    </Router>
  );
}

export default App;
