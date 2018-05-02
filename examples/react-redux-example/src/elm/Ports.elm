port module Ports exposing (..)

import ReduxData exposing (..)
import Json.Encode exposing (Value)


{-| Redux state change port

When a change happens in Redux, React receives the whole store and usually rerenders
the page. In our case rerendering is disabled and the new data will flow into
Elm through this port.

-}
port stateChange : (ReduxData -> msg) -> Sub msg


{-| Redux dispatch port

This function generates an action and dispatches it to Redux.
The actions property takes a list but in most cases you'll only need one
action.
ex.:

    Ports.dispatch
        { actions = [ "increment" ]
        , payload = [ Encode.int 2 ]
        }

        =>

    dispatch(action.increment(2));

In case you want to nest actions (use the first action as the payload for the second),
you can use lists.
ex.:

    Ports.dispatch
        { actions = [ "getBank", "generateReceivePostBank" ]
        , payload = [ Encode.string "007" ]
        }

        =>

    dispatch(action.generateReceivePostBank(action.getBank("007")));

-}
port dispatch : { actions : List String, payload : List Value } -> Cmd msg


{-| General JS port

Accessing global functions.
ex.:

    Ports.jsAction
        { object = "console"
        , method = "log"
        , payload = [ Json.Encode.string "Sending different types", Json.Encode.int 11 ]
        }

        =>

    global.console.log("Sending different types", 11);

-}
port jsAction : { object : String, method : String, payload : List Value } -> Cmd msg
