import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login'
import Signup from './Signup'
import MakeMeme from './makeMeme'
import YourMemes from './yourMemes'
import Home from './Home'

const App = () => (

  <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path = "/home">
          <Home />
        </Route>
      </Switch>
  </Router>
)



export default App

/*<Route path="/makeMeme">
          <MakeMeme />
        </Route>
        <Route path="/yourMemes">
          <YourMemes />
        </Route>*/