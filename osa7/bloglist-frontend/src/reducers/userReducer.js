import userService from '../services/users'

const compareByName = function ( user1, user2 ) {
  if ( user1.name.toUpperCase() === user2.name.toUpperCase() ) {
    return 0
  }

  if ( user1.name.toUpperCase() > user2.name.toUpperCase() ) {
    return 1
  }

  return -1
}


const userReducer = ( state = [], action ) => {
  switch ( action.type ) {
    case 'INIT_USERS': {
      const sortedUsers = action.data.sort( compareByName )
      return sortedUsers
    }
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch ({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer