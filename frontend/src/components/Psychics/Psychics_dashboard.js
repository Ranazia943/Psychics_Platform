// Linkedpages.js

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
import Psyadd_profile from "./Psyadd_profile";
import update from "./Update";
import feed_back from "./Feed_back";
import Messages from "./Messages";
import Psy_register from "./Psy_register";
import { PsyuseAuthContext } from "../../context/PsyAuthContext";
import Psy_login from "./Psy_login";
import Chatlive from "./Chatlive";
import Payment_gateway from "./Payment_gateway";

const Linkedpages = () => {
  const { authPsychics } = PsyuseAuthContext();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/psychics/login">
            {authPsychics ? (
              <Redirect to="/psychics/pages/add_profile" />
            ) : (
              <Psy_login />
            )}
          </Route>
          <Route path="/psychics/pages/signup">
            {authPsychics ? (
              <Redirect to="/psychics/pages/add_profile" />
            ) : (
              <Psy_register />
            )}
          </Route>
          <Route path="/psychics/pages">
            {authPsychics ? (
              <>
                <PsyHeader />
                <Psysidenav />
                <Switch>
                  <Route
                    path="/psychics/pages/add_profile"
                    component={Psyadd_profile}
                  />
                  <Route path="/psychics/pages/Home" component={Home} />
                  <Route
                    path="/psychics/pages/Profile"
                    component={PsyProfile}
                  />
 

 <Route path="/psychics/pages/chatlive" component={Chatlive} />
 
                  
                 

                  <Route
                    path="/psychics/pages/Update_profile"
                    component={update}
                  />
                  <Route
                    path="/psychics/pages/feed_back"
                    component={feed_back}
                  />
                  <Route path="/psychics/pages/gate_way" component={Payment_gateway}/>
                  <Route path="/psychics/pages/Messages" component={Messages} />
                  <Redirect to="/psychics/pages/update" component={update} />
                </Switch>
              </>
            ) : (
              <Redirect to="/psychics/login" />
            )}
          </Route>
          <Redirect to="/psychics/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default Linkedpages;
