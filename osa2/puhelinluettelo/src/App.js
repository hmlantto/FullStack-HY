import React, { useEffect, useState } from 'react'
import Filter      from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts    from './components/Contacts'
import contactsService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationClass, setNotificationClass ] = useState('')

  useEffect(() => {
    contactsService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const names = contacts.map( (contact) => contact.name.toLowerCase() )

    if (names.includes( newName.toLowerCase() )) {
      if( window.confirm( `${newName} is already in phonebook. Replace the old number with a new one?` ) ) {
        const oldContact = contacts.find( x => x.name === newName )
        const changedContact = { ...oldContact, number: newNumber}

        contactsService
          .update(changedContact.id, changedContact)
          .then(newContact => {
            setContacts(contacts.map(contact => contact.id !== changedContact.id ? contact : newContact))
            setNotification(`Phone number for ${newName} updated`)
            setNotificationClass('notification')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
        })
        .catch(error => {
          setNotification(`${newName} not found`)
          setNotificationClass('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setContacts(contacts.filter(x => x.id !== changedContact.id))
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const contactObject = {
      name: newName,
      number: newNumber
    }

    contactsService
      .create(contactObject)
      .then(newContact => {
        setContacts(contacts.concat(newContact))
        setNotification(`Added ${newName}`)
        setNotificationClass('notification')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const removeContact = (contact) => {
    if( window.confirm(`Delete ${contact.name}?`) ) {
      contactsService
      .remove(contact.id)
      .then( () => {
        setContacts(contacts.filter(n => n.id !== contact.id))
        setNotification(`${contact.name} removed`)
        setNotificationClass('notification')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setFilterBy(event.target.value)
  }

  let containsSubstring = (contact) => ( contact.name.toLowerCase().includes(filterBy.toLowerCase()) )
  let contactsToShow = contacts.filter(containsSubstring)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} className={notificationClass} />
      <Filter filterBy={filterBy} handleFiltering={handleFiltering} />

      <h3>Add new contact</h3>
      <ContactForm addContact={addContact}
                   newName={newName}
                   handleNameChange={handleNameChange}
                   newNumber={newNumber}
                   handleNumberChange={handleNumberChange} />

      <h3>Contacts</h3>
      <Contacts contacts={contactsToShow} removeContact={removeContact} />
    </div>
  )

}

export default App