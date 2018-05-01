port module Ports exposing (..)

import ReduxData exposing (..)
import Json.Encode exposing (Value)


-- PORTS --


{-| Redux state change port

Redux で store の中身が変わった時に発生するイベント。
（ElmBridge React component の shouldComponentUpdate で発生する）

-}
port stateChange : (ReduxState -> msg) -> Sub msg


{-| Redux dispatch port

actions のリストからネステッドアクションを生成し、最後に dispatch をする
Redux に action を dispatch する
例：

    Ports.dispatch
        { actions = [ "getBank", "generateReceivePostBank" ]
        , payload = [ Encode.string "007" ]
        }

        =>

    dispatch(action.generateReceivePostBank(getBank("007")));

-}
port dispatch : { actions : List String, payload : List Value } -> Cmd msg


{-| 汎用的JS port

global のオブジェクトにアクセスして、メソッドを実行する
例：

    Ports.jsAction
        { object = "console"
        , method = "log"
        , payload = [ Json.Encode.string "Sending different types", Json.Encode.int 11 ]
        }

        =>

    global.console.log("Sending different types", 11);

-}
port jsAction : { object : String, method : String, payload : List Value } -> Cmd msg



-- HELPER FUNCTIONS --


{-| global.window.print() を実行する
-}
windowPrint =
    jsAction { object = "window", method = "print", payload = [] }
