import React from 'react'

const Weather = ( {weather} ) => {
  if ( weather.length === 0 ) {
    return (
      <div></div>
    )
  }
  
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <div>
        <strong>temperature:</strong> {weather.current.temperature} Celsius<br />
        <img src={weather.current.weather_icons} alt="Weather icon" height="80em" /><br />
        <strong>wind:</strong> {weather.current.wind_speed} m/s direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

export default Weather