{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric #-}

module Resolvers.Post where

import Data.Morpheus.Types
import Data.Text
import GHC.Generics

data Post = Post
  { name :: Text,
    body :: Text,
    date :: Text
  }
  deriving (Generic, GQLType)

newtype PostByNameArgs = PostByNameArgs
  {postName :: Text}
  deriving (Generic, GQLType)
