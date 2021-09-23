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

export const setNotification = ( notification, timeInSecs ) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, timeInSecs * 1000 )
  }
}

export default notificationReducer