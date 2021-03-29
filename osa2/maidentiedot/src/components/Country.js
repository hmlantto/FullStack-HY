import React from 'react'

const Country = ( {country} ) => {
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
      </div>
    )
  }

export default Country