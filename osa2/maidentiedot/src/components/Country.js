import React from 'react'
import Weather from './Weather'

const Country = ( {country, weather} ) => {
  return (
    <div>
      <h2>{country.name}</h2>

      <div>
        capital {country.capital}<br />
        population {country.population}
      </div>

      <h3>languages</h3>
      <div>
        <ul>
          {country.languages.map(language =>
            <li key={language.iso639_1}>{language.name}</li>
          )}
        </ul>
      </div>
      
      <img src={country.flag} alt="Flag" height="80em" />

      <Weather weather={weather} />
    </div>
  )
}

export default Country