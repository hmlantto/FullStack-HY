const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const newState1 = {
        ...state,
        good: state.good + 1
      }
      return newState1
    case 'OK':
      const newState2 = {
        ...state,
        ok: state.ok + 1
      }
      return newState2
    case 'BAD':
      const newState3 = {
        ...state,
        bad: state.bad + 1
      }
      return newState3
    case 'ZERO':
      const newState4 = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return newState4
    default: return state
  }
  
}

export default counterReducer