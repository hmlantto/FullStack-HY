import React            from 'react'
import { useDispatch }  from 'react-redux'
import { Button, Form } from 'react-bootstrap'

import loginService from '../services/login'
import blogService  from '../services/blogs'

import { setLogin }        from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ( { username, setUsername, password, setPassword } ) => {
  const dispatch = useDispatch()

  const handleLogin = async ( event ) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify( user )
      )
      blogService.setToken( user.token )

      dispatch( setLogin( user ) )
      setUsername( '' )
      setPassword( '' )

    } catch ( exception ) {
      console.log( exception.message )
      dispatch( setNotification( 'wrong username or password', 'error', 5 ) )
    }
  }

  return(
    <div>
      <h2>Log in to application</h2>

      <Form style={ { maxWidth: '30rem' } } onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm