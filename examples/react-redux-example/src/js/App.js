import React from 'react'
import { ElmWithRedux } from 'elm-react'
import { Main } from '../elm/Main.elm'
import { connect } from 'react-redux'
import * as action from './action.js'

class Demo extends React.Component {
  render() {
    return(
      <div>
        <div>
          This is a React app. You can change this number: { this.props.num }
        </div>
        <button onClick={ this.props.increment }>Increment</button>
        <button onClick={ this.props.decrement }>Decrement</button>
        <hr />
        <ElmWithRedux
          src={ Main }
          state={ this.props.state }
          actions={ action }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  num: state.num
})

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(action.increment(1)),
  decrement: () => dispatch(action.decrement(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
  
