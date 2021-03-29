import React, { useState } from 'react'
import Filter      from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts     from './components/Contacts'

const App = () => {
  const [ contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const names = contacts.map( (contact) => contact.name.toLowerCase() )

    if (names.includes( newName.toLowerCase() )) {
      alert(`${newName} is already in phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }

    const contactObject = {
      name: newName,
      number: newNumber
    }

    setContacts(contacts.concat(contactObject))
    setNewName('')
    setNewNumber('')
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
      <Filter filterBy={filterBy} handleFiltering={handleFiltering} />

      <h3>Add new contact</h3>
      <ContactForm addContact={addContact}
                   newName={newName}
                   handleNameChange={handleNameChange}
                   newNumber={newNumber}
                   handleNumberChange={handleNumberChange} />

      <h3>Contacts</h3>
      <Contacts contacts={contactsToShow} />
    </div>
  )

}

export default App