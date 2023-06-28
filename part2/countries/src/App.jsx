import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const filteredCountries = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  let display = null

  if (filteredCountries.length > 10) {
    display = <p>Too many matches specify another</p>
  } else if (filteredCountries.length > 1) {
    display = filteredCountries.map(c => (
      <React.Fragment key={c.cca2}>
        {c.name.common}
        <br />
      </React.Fragment>
    ))
  } else if (filteredCountries.length == 1) {
    const targetCountry = filteredCountries[0]
    console.log(targetCountry)

    display = (
      <div>
        <h2>{targetCountry.name.common}</h2>
        capital {targetCountry.capital.join(',')} <br />
        area {targetCountry.area}
        <h3>languages:</h3>
        <ul>
          {Object.values(targetCountry.languages).map(l => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={targetCountry.flags.png} />
      </div>
    )
  }

  return (
    <div>
      find countries{' '}
      <input
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <br />
      {display}
    </div>
  )
}

export default App
