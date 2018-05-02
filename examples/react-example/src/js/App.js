import React from 'react'
import { Main } from '../elm/Main.elm'
import { Elm } from 'elm-react'

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
  
