import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import routes from './config/routes.js'
import {AuthProvider} from './context'
import NavBar from './components/navbar/NavBar.jsx'
import AppRoute from './components/AppRoute.js'



function App() {
  return (
    <AuthProvider>
      <Router>
      <NavBar/>  
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              role={route.role}
            />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
