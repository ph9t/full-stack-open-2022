import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
  ])
  const [newName, setNewName] = useState('')

  const handleChange = e => {
    setNewName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const personExists = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (personExists) {
      alert(`${newName} is already added in the phonebook.`)
      return
    }

    const newPerson = {
      name: newName,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => (
        <>
          {p.name}
          <br />
        </>
      ))}
    </div>
  )
}

export default App
