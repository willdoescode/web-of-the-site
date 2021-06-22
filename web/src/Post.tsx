import React from 'react';
import { useParams } from 'react-router-dom';
import './Post';
import { useQuery } from 'urql';
import ReactMarkdown from 'react-markdown';

const postQuery =
  `
query($postId: Int!) {
  postById(postId: $postId) {
    id
    name
    body
    date
  }
}
`

interface Param {
  id: number
}

const Post = () => {
  const { id: postId } = (useParams() as Param | undefined)!;

  const [result, _reexecuteQuery] = useQuery({
    query: postQuery,
    //                   Not letting me just pass in postId :(
    variables: { postId: parseInt(String(postId), 10) },
  })

  const { data, fetching, error } = result;

  if (fetching) return <h1>Fetching Post...</h1>;
  if (error) return <h1>Error Loading Post: <span className="loaderror">{error.message}</span></h1>;

  return <>
    <h1>{data.postById.name}</h1>
    <h1><ReactMarkdown>
      {data.postById.body}
    </ReactMarkdown>
    </h1>
  </>
}

export default Post;
