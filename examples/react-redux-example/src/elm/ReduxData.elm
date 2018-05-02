module ReduxData exposing (..)

{-| The type declaration of ReduxData should match up with the one on the JS side.
If they don't match you'll experience runtime errors.
However you can skip values if you like and only use the ones that are needed
in your application.
-}


type alias ReduxData =
    { num : Int }
