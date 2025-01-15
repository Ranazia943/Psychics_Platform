import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PsyHeader from "./PsyHeader";
import Home from "./Home";
import Psysidenav from "./Psysidenav";
import PsyProfile from "./PsyProfile";
import Psy_History from "./Psy_History";
import update from "./Update";
import feed_back from "./Feed_back";
import Messages from "./Messages";
import Psy_register from "./Psy_register";
import { PsyuseAuthContext } from "../../context/PsyAuthContext";
import Psy_login from "./Psy_login";
import Chatlive from "./Chatlive";
import Payment_gateway from './Payment_gateway';

const Linkedpages = () => {
  const { authPsychics } = PsyuseAuthContext();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/psychics/login">
            {authPsychics ? (
              <Redirect to="/psychics/pages/Home" />
            ) : (
              <Psy_login />
            )}
          </Route>
          <Route path="/psychics/pages/signup">
            {/* Always show the registration page, regardless of authentication status */}
            <Psy_register />
          </Route>
          <Route path="/psychics/pages">
            {authPsychics ? (
              <>
                <PsyHeader />
                <Psysidenav />
                <Switch>
                  <Route exact path="/psychics/pages/Home" component={Home} />
                  <Route
                    exact
                    path="/psychics/pages/Profile"
                    component={PsyProfile}
                  />
                  <Route
                    exact
                    path="/psychics/pages/chatlive"
                    component={Chatlive}
                  />
                  <Route
                    exact
                    path="/psychics/pages/History"
                    component={Psy_History}
                  />
                  <Route
                    exact
                    path="/psychics/pages/Update_profile"
                    component={update}
                  />
                  <Route
                    exact
                    path="/psychics/pages/feed_back"
                    component={feed_back}
                  />
                  <Route
                    exact
                    path="/psychics/pages/gate_way"
                    component={Payment_gateway}
                  />
                  <Route
                    exact
                    path="/psychics/pages/Messages"
                    component={Messages}
                  />
                  {/* Default route for /psychics/pages */}
                  <Route exact path="/psychics/pages">
                    <Redirect to="/psychics/pages/Home" />
                  </Route>
                </Switch>
              </>
            ) : (
              <Redirect to="/psychics/login" />
            )}
          </Route>
          {/* Default route for unmatched paths */}
          <Route path="*">
            <Redirect to="/psychics/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Linkedpages;