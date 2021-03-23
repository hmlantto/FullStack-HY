import React, { useState } from 'react'

const Statistics = ( props ) => {
  return (
    <>
      <h1>statistics</h1>
      <div>
        good {props.good}<br />
        neutral {props.neutral}<br />
        bad {props.bad}<br />
        all {props.good + props.neutral + props.bad}<br />
        average {(props.good + -1 * props.bad)/(props.good + props.neutral + props.bad)}<br />
        positive {props.good / (props.good + props.neutral + props.bad) * 100} %
      </div>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood( good + 1 )
  }
  
  const handleNeutralClick = () => {
    setNeutral( neutral + 1 )
  }
  
  const handleBadClick = () => {
    setBad( bad + 1 )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App