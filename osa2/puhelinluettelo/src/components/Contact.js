import React   from 'react'

const Contact = ( {contact, removeContact} ) => {
    return (
      <p>
        {contact.name} {contact.number} <button type="button" value={contact} onClick={removeContact}>delete</button>
      </p>
    )
  }

export default Contact