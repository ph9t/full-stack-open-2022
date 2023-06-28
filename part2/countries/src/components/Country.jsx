import React from 'react'

const Country = ({ name, capital, area, languages, flagUrl }) => {
  return (
    <div>
      <h2>{name}</h2>
      capital {capital.join(',')} <br />
      area {area}
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(l => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={flagUrl} />
    </div>
  )
}

export default Country
