import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import routes from './config/routes.js'



function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
