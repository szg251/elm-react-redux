import {
  INCREMENT,
  DECREMENT
} from './action-types.js'

const initState = {
  num: 0
}

export default (state = initState, action) => {
  switch(action.type) {
    case INCREMENT: {
      return { ...state, num: state.num + action.payload }
    }

    case DECREMENT: {
      return { ...state, num: state.num - action.payload }
    }
    default: {
      return state
    }
  }
}
