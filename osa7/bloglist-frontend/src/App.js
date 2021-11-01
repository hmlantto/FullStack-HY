import React, { useEffect, useState }         from 'react'
import { useDispatch, useSelector }           from 'react-redux'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Nav }                        from 'react-bootstrap'

import { initializeBlogs } from './reducers/blogReducer'
import { setLogin }        from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import Blog         from './components/Blog'
import Blogs        from './components/Blogs'
import LoggedIn     from './components/LoggedIn'
import LoginForm    from './components/LoginForm'
import Notification from './components/Notification'
import User         from './components/User'
import Users        from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector( state => state.login )

  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )

  useEffect( () => {
    dispatch( initializeBlogs() )
    dispatch( initializeUsers() )
  }, [ dispatch ] )

  useEffect(() => {
    dispatch( setLogin() )
  }, [])

  const padding = {
    padding: 5
  }

  if ( user === null ) {
    return (
      <div className="container">
        <Notification />
        <LoginForm username={ username } setUsername={ setUsername } password={ password } setPassword={ setPassword } />
      </div>
    )
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <span style={padding}><LoggedIn user={ user } /></span>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Notification />

          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog user={ user } />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App