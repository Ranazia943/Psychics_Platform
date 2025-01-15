import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagelinks from "./components/pages/Pagelinks";
import Admindashboard from './components/Admin/Admindashboard'
import Psychics_dashboard from './components/Psychics/Psychics_dashboard'

function App() {
  
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            {/* Your existing routes */}
            <Route path="/" component={Pagelinks} exact />
            <Route path="/admin" component={Admindashboard} />
            <Route path="/psychics" component={Psychics_dashboard} />
            {/* Fallback route */}
            <Route component={Pagelinks} />
          </Switch>

          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
