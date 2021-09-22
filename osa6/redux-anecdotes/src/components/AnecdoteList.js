import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        { anecdote.content }
      </div>
      <div>
        has { anecdote.votes }
        <button onClick={ handleClick }>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector( state => state.anecdotes )
  const filterString = useSelector( state => state.filter )
  const containsSubstring = ( anecdote ) => ( anecdote.content.toLowerCase().includes( filterString.toLowerCase() ) )
  const anecdotesToShow = anecdotes.filter( containsSubstring )
  
  const compare = ( a, b ) => {
    if ( b.votes !== a.votes ) {
      return b.votes - a.votes
    }

    if ( b.content > a.content ) {
      return -1
    }
    else if ( b.content < a.content ) {
      return 1
    }
    
    return 0
  }
  const sortedAnecdotes = anecdotesToShow.sort( compare )

  const vote = ( id, content ) => {
    dispatch( voteAnecdote( id ) )
    dispatch( setNotification( { data: { notification: content, notifType: 'vote' } } ) )
    setTimeout(() => {
      dispatch( removeNotification( null ) )
    }, 5000)
  }

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={ anecdote.id }
          anecdote={ anecdote }
          handleClick={ () => vote( anecdote.id, anecdote.content ) }
        />
      )}
    </>
  )
}

export default AnecdoteList