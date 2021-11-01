import blogService from '../services/blogs'

const loginReducer = ( state = null, action ) => {
  switch ( action.type ) {
    case 'SET_LOGIN':
      return action.data
    case 'REMOVE_LOGIN':
      return null
    default:
      return state
  }
}

export const setLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if ( loggedUserJSON ) {
      const loggedInUser = JSON.parse( loggedUserJSON )
      dispatch ({
        type: 'SET_LOGIN',
        data: loggedInUser
      })
      blogService.setToken( loggedInUser.token )
    }
  }
}

export const removeLogin = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch ({
      type: 'REMOVE_LOGIN'
    })
  }
}

export default loginReducer