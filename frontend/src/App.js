import Navbar from './components/Navbar'
import Login from './routes/Login'
import Feed from './routes/Feed'
import NavbarAfterLogin from './components/NavbarAfterLogin'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route path="/feed/:username">
              <NavbarAfterLogin />
              <Feed />
            </Route>
            <Route path="/">
              <Navbar />
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;