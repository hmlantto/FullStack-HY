import React from 'react'
import Country from './Country'

const Countries = ( {countries, handleFiltering, weather} ) => {
  if ( countries.length > 10 ) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if ( countries.length === 1 ) {
    return (
      <Country country={countries[0]} weather={weather} />
    )
  }
  
  return (
    <div>
      {countries.map(country =>
          <p key={country.name}>
            {country.name}
            <button type="button" value={country.name} onClick={handleFiltering}>show</button>
          </p>
        )}
    </div>
  )
}

export default Countries