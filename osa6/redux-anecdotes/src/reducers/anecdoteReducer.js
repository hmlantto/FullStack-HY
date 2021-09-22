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

export const createAnecdote = ( content ) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew( content )
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = ( id ) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
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

export default anecdoteReducer