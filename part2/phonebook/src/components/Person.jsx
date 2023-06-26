import React from 'react'

const Person = ({ name, number, deletePerson }) => {
  return (
    <div>
      {name} {number} <button onClick={deletePerson}>delete</button>
      <br />
    </div>
  )
}

export default Person
