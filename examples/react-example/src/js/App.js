import React from 'react'
import { Elm } from 'elm-react-redux'
import { Main } from '../elm/Main.elm'

class Demo extends React.Component {
  render() {
    return(
      <div>
        <div>
          This is a React app.
        </div>
        <hr />
        <Elm src={ Main } />
      </div>
    )
  }
}

export default Demo
  
