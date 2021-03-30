import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterBy, setFilterBy ] = useState('')
  const [ weather, setWeather ] = useState([])
  const hasFetchedWeather = useRef(false)

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
  
  useEffect(() => {
    if ( countriesToShow.length > 1 && hasFetchedWeather.current === true ) {
      hasFetchedWeather.current = false
      setWeather([])
    }
    if ( countriesToShow.length === 1 && hasFetchedWeather.current === false ) {
      const location = countriesToShow[0].name
      axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${location}&units = m`)
        .then(response => {
          hasFetchedWeather.current = true
          setWeather(response.data)
      })
    }
  }, [countriesToShow])
  
  return (
    <div>
      <Filter filterBy={filterBy} handleFiltering={handleFiltering} />

      <Countries countries={countriesToShow} handleFiltering={handleFiltering} weather={weather} />
    </div>
  )
}

export default App
