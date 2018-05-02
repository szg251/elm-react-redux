import {
  INCREMENT,
  DECREMENT
} from './action-types.js'

const increment = value => ({
  type: INCREMENT,
  payload: value || 0
})

const decrement = value => ({
  type: DECREMENT,
  payload: value || 0
})

export { increment, decrement }
