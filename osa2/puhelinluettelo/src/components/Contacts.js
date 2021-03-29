import React   from 'react'
import Contact from './Contact'

const Contacts = ( {contacts} ) => {
    return (
      <div>
        {contacts.map(contact =>
            <Contact key={contact.name} contact={contact} />
          )}
      </div>
    )
  }

export default Contacts