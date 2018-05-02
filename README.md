# elm-react

Elm wrapper for a React-Redux application.  
With this wrapper component you can simply embed Elm apps into React-Redux, dispatch actions and receive new props from React.

### Usage
1. Install with the package manager of your choice:  
`npm install --save elm-react` or `yarn add elm-react`

2. Set up webpack to compile Elm for you:
```js
{
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader: 'elm-webpack-loader',
}
```
3. Create an Elm app somewhere inside your React project folder (src/elm is recommended)
4. Import this wrapper and your Elm app:   
```js
import { Elm } from 'elm-react'
import { Main } from '../elm/Main.elm'
```
5. Use this component anywhere in your application
```js
render() {
    return <Elm src={ Main } />
}
```
And you're good to go!

### ... of course you might want to use Redux. In that case you'll need to set up a few more things:  
1. The install process and webpack config is the same as above.
2. Create an Elm app inside your React project folder. Your Elm app has to be a programWithFlags, this is how we pass the Redux state to Elm the first time it loads.
Also, you'll need to write type definitions for your Redux State and use that as the type of the flag. Finally, you'll need set up the ports like this:

```elm
port stateChange : (ReduxData -> msg) -> Sub msg

port dispatch : { actions : List String, payload : List Value } -> Cmd msg

port jsAction : { object : String, method : String, payload : List Value } -> Cmd msg
```
I would recommend separating ports and redux data types to modules, like I did in the [examples](https://github.com/gege251/elm-react/tree/master/examples/react-redux-example/src/elm).
3. Import ElmWithRedux this wrapper and your Elm app
```js
import { ElmWithRedux } from 'elm-react'
import { Main } from '../elm/Main.elm'
```
4. The ElmWithRedux component accepts a new *actions* attribute. This will enable our Elm app to use Redux action creators.  
We also have an optional *convertState* attribute, which accepts a converter function that will be applied to the state object coming from Redux. You can use this to narrow down the reducers, or convert some reducer to a different name.

```js
<ElmWithRedux
    src={ Main }
    actions={ action }
    convertState={ state => state.someReducer }
/>
```

### Converting states
Sometimes you will find yourself in a situation (like I did) when your Redux state object keys are invalid in Elm. Here's an example:
```js
{
    warpReducer: {
        WW_001: 'Value1',
        WW_002: 'Value2'
    }
}
```
Capitalized first letters are not allowed in Elm as record keys, so this will cause an error. The solution for this is to write a stateConverter.
```js
import { converter } from 'elm-react'

const warpReducer = converter(/^W/, 'w')
const convertState = state => ({
    warpReducer: convertWarpReducer(state.warpReducer)
})

<ElmWithRedux
    src={ Main }
    actions={ action }
    convertState={ convertState }
/>
```
This will result in some nicer objects:
```js
{
    warpReducer: {
        wW_001: 'Value1',
        wW_002: 'Value2'
    }
}
```
Under the hood it will do `key.replace(oldkey, newkey)` on all your object keys.  
  
That would be it. If something is wrong, or you would like to see some new feature, please feel free to make an Issue!
