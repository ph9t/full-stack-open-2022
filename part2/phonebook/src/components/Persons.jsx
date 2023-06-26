import Person from './Person'

const Persons = ({ filteredPersons, deleteEntryOf }) => {
  return (
    <div>
      {filteredPersons.map(p => (
        <Person
          key={p.id}
          name={p.name}
          number={p.number}
          deletePerson={() => deleteEntryOf(p.id)}
        />
      ))}
    </div>
  )
}

export default Persons
