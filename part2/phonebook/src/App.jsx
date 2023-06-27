import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]) */

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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

  const deleteEntryOf = id => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .deleteEntry(id)
        .then(_ => setPersons(persons.filter(p => p.id !== id)))
    }
  }

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

      personService.createEntry(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

      return
    }

    const confirmationMessage = `${retrievedPerson?.name} is already added to the phonebook. Replace the old number with a new one?`
    const overridePerson = window.confirm(confirmationMessage)

    overridePerson &&
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
        })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
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
