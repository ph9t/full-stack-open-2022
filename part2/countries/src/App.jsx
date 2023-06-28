import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Country from './components/Country'
import CountryListItem from './components/CountryListItem'

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
      <CountryListItem
        key={c.cca2}
        name={c.name.common}
        show={() => setSearchQuery(c.name.common)}
      />
    ))
  } else if (filteredCountries.length == 1) {
    const targetCountry = filteredCountries[0]

    display = (
      <Country
        name={targetCountry.name.common}
        capital={targetCountry.capital}
        area={targetCountry.area}
        languages={targetCountry.languages}
        flagUrl={targetCountry.flags.png}
      />
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
