import React from 'react'
import Country from './Country'

const Countries = ( {countries} ) => {
  if ( countries.length > 10 ) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if ( countries.length === 1 ) {
    return (
      <Country country={countries[0]} />
    )
  }
  
  return (
    <div>
      {countries.map(country =>
          <p key={country.name}>{country.name}</p>
        )}
    </div>
  )
}

export default Countries