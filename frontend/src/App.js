import Navbar from './components/Navbar'
import Login from './routes/Login'
import Feed from './routes/Feed'
import NavbarAfterLogin from './components/NavbarAfterLogin'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreatePost from './routes/CreatePost'
import ViewPost from './routes/ViewPost'
import Footer from './components/Footer'
import Profile from './routes/Profile'
import GetTsv from './routes/GetTsv'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route path='/:user_id/posts/:post_id'>
              <ViewPost />
            </Route>
            <Route path="/feed/:user_id">
              <NavbarAfterLogin />
              <Feed />
            </Route>
            <Route path='/create/:user_id'>
              <CreatePost />
            </Route>
            <Route path='/profile/:user_id'>
              <NavbarAfterLogin />
              <Profile />
            </Route>
            <Route path='/getTSVdump'>
              <Navbar></Navbar>
              <GetTsv />
            </Route>
            <Route path="/" exact>
              <Navbar />
              <Login />
              <Footer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;