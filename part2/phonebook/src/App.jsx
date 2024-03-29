import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  useEffect(() => {
    personService.getAllEntries().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleFilterChange = e => {
    setNameFilter(e.target.value)
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const notify = (message, type, duration = 2000) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, duration)
  }

  const deleteEntryOf = id => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .deleteEntry(id)
        .then(_ => setPersons(persons.filter(p => p.id !== id)))
        .catch(error => {
          notify(
            `Entry for ${person.name} has already been removed from the server.`,
            'err'
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // refactor this method
  const handleSubmit = e => {
    e.preventDefault()

    const retrievedPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (!retrievedPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .createEntry(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          notify(`Added ${returnedPerson.name}`, 'ok')
        })
        .catch(error => {
          console.log(error.response.data.error)
          notify(error.response.data.error, 'err')
        })

      return
    }

    const confirmationMessage = `${retrievedPerson?.name} is already added to the phonebook. Replace the old number with a new one?`
    const overridePerson = window.confirm(confirmationMessage)

    if (overridePerson) {
      personService
        .updateEntry(retrievedPerson.id, {
          ...retrievedPerson,
          number: newNumber,
        })
        .then(returnedPerson => {
          setPersons(
            persons.map(p => (p.id !== retrievedPerson.id ? p : returnedPerson))
          )
          setNewName('')
          setNewNumber('')

          notify(`Modified number for ${retrievedPerson.name}`, 'ok')
        })
        .catch(error => {
          console.log(error.response.data.error)
          notify(error.response.data.error, 'err')
        })
    }
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={nameFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        deleteEntryOf={deleteEntryOf}
      />
    </div>
  )
}

export default App
