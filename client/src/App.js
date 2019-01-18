import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navs from "./components/Nav"
import Dashboard1 from "./pages/Dashboard";
import ShowAccount from "./pages/Account";
import Landing from "./pages/Landing";
import SignOut from "./pages/SignOut";

function App() {
  return (
    <Router>
      <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard1} />
          <Route exact path="/signout" component={SignOut} />

          <Route path="/account/:id" component={ShowAccount} />
        
    </div>
  </Router>

  );
}

export default App;
