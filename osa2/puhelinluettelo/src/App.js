import React, { useEffect, useState } from 'react'
import axios       from 'axios'
import Filter      from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts    from './components/Contacts'

const App = () => {
  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setContacts(response.data)
      })
  }, [])

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