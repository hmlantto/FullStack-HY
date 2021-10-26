let timeoutID = null

const notificationReducer = ( state = null, action ) => {
  switch ( action.type ) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = ( message, notificationClass, timeInSecs ) => {
  return async dispatch => {
    if ( timeoutID !== null ) {
      clearTimeout( timeoutID )
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        notificationClass
      }
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
      timeoutID = null
    }, timeInSecs * 1000 )
  }
}

export default notificationReducer