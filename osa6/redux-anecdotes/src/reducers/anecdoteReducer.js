import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch ( action.type ) {
    case 'ADD_ANECDOTE':
      return state.concat( action.data )
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find( a => a.id === id )
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map( anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
  }
}

export const createAnecdote = ( content ) => {
  const object = { content, votes: 0 }
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew( object )
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = ( anecdote ) => {
  const newObject = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update( newObject.id, newObject )
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer