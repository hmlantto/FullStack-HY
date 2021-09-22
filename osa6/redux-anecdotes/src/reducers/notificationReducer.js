const notificationReducer = ( state = null , action ) => {
  switch ( action.type ) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      state = null
      return state
    default:
      return state
  }
}

export const setNotification = ( data ) => {
  return {
    type: 'SET_NOTIFICATION',
    data
  }
}

export const removeNotification = ( data ) => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data
  }
}

export default notificationReducer