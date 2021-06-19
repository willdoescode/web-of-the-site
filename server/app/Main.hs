{-# LANGUAGE OverloadedStrings #-}

module Main where

import Control.Monad.Trans
import Data.Maybe
import Data.Monoid
import Resolvers.Root
import System.Environment
import Web.Scotty

(<|>) :: Maybe a -> a -> a
x <|> y = fromJust . getFirst $ First x <> First (Just y)

main :: IO ()
main = do
  env <- lookupEnv "PORT"

  scotty (read $ env <|> "3000") $ do
    post "/api" $ raw =<< (liftIO . api =<< body)

    get "/graphql" $ do
      setHeader "Content-Type" "text/html; charset=utf8"
      file "playground.html"
