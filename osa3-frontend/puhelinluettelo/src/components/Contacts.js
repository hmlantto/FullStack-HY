import React   from 'react'
import Contact from './Contact'

const Contacts = ( {contacts, removeContact} ) => {
    return (
      <div>
        {contacts.map(contact =>
            <Contact key={contact.id} 
                     contact={contact} 
                     removeContact={() => removeContact(contact)} />
          )}
      </div>
    )
  }

export default Contacts