import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifState = useSelector( state => state.notification )

  if ( notifState === null ) {
    return null
  }

  const notifContent = notifState.data.notification
  const notifType = notifState.data.notifType
  let notifText = ''

  if ( notifType === 'create' ) {
    notifText = 'you created'
  }
  else if ( notifType === 'vote' ) {
    notifText = 'you voted'
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={ style }>
      {notifText} '{ notifContent }'
    </div>
  )
}

export default Notification