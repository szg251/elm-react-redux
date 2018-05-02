module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Model =
    { name : String }


type Msg
    = InputName String


initModel : Model
initModel =
    { name = "" }


update : Msg -> Model -> Model
update msg model =
    case msg of
        InputName name ->
            { model | name = name }


view : Model -> Html Msg
view model =
    let
        displayName =
            if model.name == "" then
                "Stranger"
            else
                model.name
    in
        div []
            [ input
                [ placeholder "Insert your name here"
                , onInput InputName
                , value model.name
                ]
                []
            , h1 [] [ text ("Hello " ++ displayName ++ "!") ]
            ]


main =
    beginnerProgram
        { model = initModel
        , update = update
        , view = view
        }
