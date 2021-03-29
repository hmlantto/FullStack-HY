import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
const [ countries, setCountries ] = useState([])
const [ filterBy, setFilterBy ] = useState('')

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
}, [])

const handleFiltering = (event) => {
  setFilterBy(event.target.value)
}

let containsSubstring = (country) => ( country.name.toLowerCase().includes(filterBy.toLowerCase()) )
let countriesToShow = countries.filter(containsSubstring)

  return (
    <div>
      <Filter filterBy={filterBy} handleFiltering={handleFiltering} />

      <Countries countries={countriesToShow}/>
    </div>
  )
}

export default App
