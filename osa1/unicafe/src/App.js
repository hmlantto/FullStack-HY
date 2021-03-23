import React, { useState } from 'react'

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
        good {props.good}<br />
        neutral {props.neutral}<br />
        bad {props.bad}<br />
        all {props.allClicks}<br />
        average {(props.good + -1 * props.bad)/props.allClicks}<br />
        positive {props.good / props.allClicks * 100} %
      </div>
    </>
  )
}

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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

export default App