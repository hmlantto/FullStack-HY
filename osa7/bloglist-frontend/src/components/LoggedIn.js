import React           from 'react'
import { useDispatch } from 'react-redux'
import { Button }      from 'react-bootstrap'
import { removeLogin } from '../reducers/loginReducer'

const LoggedIn = ( { user } ) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch( removeLogin() )
  }

  return(
    <>
      <span className="username-span" style={ { verticalAlign: 'bottom' } }>{ user.username } logged in</span> <Button variant="outline-primary" size="sm" className="small-button" type="button" onClick={ handleLogout }>logout</Button>
    </>
  )
}

export default LoggedIn