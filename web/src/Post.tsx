import React from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';
import { useQuery } from 'urql';
import marked from 'marked';
import { Redirect } from 'react-router';

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
  const renderer = new marked.Renderer();

  const [result, _reexecuteQuery] = useQuery({
    query: postQuery,
    variables: { postId: parseInt(String(postId), 10) },
  })

  const { data, fetching, error } = result;

  if (fetching) return <h1>Fetching Post...</h1>;
  if (error) return <Redirect to='/posts' />;

  return <>
    <h1>{data.postById.name}</h1>
    <div className="markdown" dangerouslySetInnerHTML={
      { __html: marked(data.postById.body, { renderer }) }
    }></div>
  </>
}

export default Post;
