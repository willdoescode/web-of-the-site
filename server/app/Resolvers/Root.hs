{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}

module Resolvers.Root where

import Data.ByteString.Lazy.Char8 (ByteString)
import Data.Morpheus
import Data.Morpheus.Types
import Data.Text
import GHC.Generics
import Resolvers.Post

newtype Query a = Query
  { getPostByName :: PostByNameArgs -> a Post
  }
  deriving (Generic, GQLType)

rootResolver :: RootResolver IO () Query Undefined Undefined
rootResolver =
  RootResolver {queryResolver, mutationResolver, subscriptionResolver}
  where
    queryResolver = Query {getPostByName = const $ pure Post {name = "yooo", body = "yooooo", date = "yoooooooooooo"}}
    mutationResolver = Undefined
    subscriptionResolver = Undefined

api :: ByteString -> IO ByteString
api = interpreter rootResolver
