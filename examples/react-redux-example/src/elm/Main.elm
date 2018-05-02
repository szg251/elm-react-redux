module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import ReduxData exposing (ReduxData)
import Json.Encode
import Ports


-- REDUX HELPER FUNCTIONS ---


incrementBy : Int -> Cmd Msg
incrementBy value =
    Ports.dispatch
        { actions = [ "increment" ]
        , payload = [ Json.Encode.int value ]
        }


decrementBy : Int -> Cmd Msg
decrementBy value =
    Ports.dispatch
        { actions = [ "decrement" ]
        , payload = [ Json.Encode.int value ]
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    {- Subscribing to Redux data changes -}
    Ports.stateChange StateChange



-- A USUAL ELM APP --


type alias Model =
    { value : Int
    , reduxNum : Int
    }


type Msg
    = InputValue String
    | Increment
    | Decrement
    | StateChange ReduxData



{- Initial data comes through flags -}


init : ReduxData -> ( Model, Cmd Msg )
init reduxData =
    { value = 0
    , reduxNum = reduxData.num
    }
        ! []


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InputValue value ->
            case String.toInt value of
                Ok validValue ->
                    { model | value = validValue } ! []

                Err _ ->
                    model ! []

        Increment ->
            model
                ! [ incrementBy model.value ]

        Decrement ->
            model
                ! [ decrementBy model.value ]

        {- Inserting data from Redux to local model -}
        StateChange reduxData ->
            { model | reduxNum = reduxData.num } ! []


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text "This is an Elm app. You can dispatch Redux actions..." ]
        , button [ onClick Increment ] [ text "Increment by" ]
        , button [ onClick Decrement ] [ text "Decrement by" ]
        , input
            [ type_ "number"
            , onInput InputValue
            , value (toString model.value)
            ]
            []
        , br [] []
        , div []
            [ text "...and also receive data from Redux."
            , text ("The current number is: " ++ toString model.reduxNum)
            ]
        ]


main : Program ReduxData Model Msg
main =
    programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
