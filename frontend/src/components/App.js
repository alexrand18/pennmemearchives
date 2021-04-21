import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import MakeMeme from './makeMeme'

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Router>
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/makeMeme">
          <MakeMeme />
        </Route>
      </Switch>
    </div>
  </Router>
)



export default App