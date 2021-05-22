import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./component/organism/Detail";

function App() {
  return (
    <div className="app">
      <Router >
        <Switch>
          <Route exact path={`/`}>
            <Home/>
          </Route>
          <Route path={`/Detail`}>
            <Detail/>
          </Route>
      </Switch>
      </Router>
    
    </div>

  );
}

export default App;
