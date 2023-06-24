const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(p => (
        <div key={p.name}>
          {p.name} {p.number}
          <br />
        </div>
      ))}
    </div>
  )
}

export default Persons
