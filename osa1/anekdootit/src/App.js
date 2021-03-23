import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( new Array(6).fill(0) )

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const getNextAnecdote = () => {
    const newRandomInt = getRandomInt(0, anecdotes.length)
    setSelected(newRandomInt)
  }

  const voteAnecdote = (selectedAnecdote) => {
    const newPoints = [...points]
    newPoints[selectedAnecdote] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      {anecdotes[selected]}<br />
      <span>has {points[selected]} votes</span><br />
      <Button handleClick={() => voteAnecdote(selected)} text="vote" />
      <Button handleClick={getNextAnecdote} text="next anecdote" />
    </div>
  )
}

const Button = ( props ) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App