import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  
  const handleGoodClick = () => {
    setGood( good + 1 )
    setAll( allClicks + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral( neutral + 1 )
    setAll( allClicks + 1)
  }
  
  const handleBadClick = () => {
    setBad( bad + 1 )
    setAll( allClicks + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

const Button = ( props ) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ( props ) => {
  if ( props.allClicks === 0 ) {
    return (
      <>
      <h1>statistics</h1>
      <div>
        No feedback given
      </div>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <div>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.allClicks} />
        <StatisticLine text="average" value={(props.good + -1 * props.bad)/props.allClicks} />
        <StatisticLine text="positive" value={props.good / props.allClicks * 100} endText="%" />
      </div>
    </>
  )
}

const StatisticLine = ( props ) => (
  <>
    {props.text} {props.value} {props.endText}<br />
  </>
)

export default App