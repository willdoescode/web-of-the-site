import React from 'react';
import './Posts.css';
import { useQuery } from 'urql';
import { Link } from 'react-router-dom';

const postsQuery = `
query {
  allPosts {
    id
    name
  }
}
`

interface Post {
  id: number,
  name: string,
}

const Posts = () => {
  const [result, _reexecuteQuery] = useQuery({
    query: postsQuery,
  })

  const { data, fetching, error } = result;

  if (fetching) return <h1>Fetching Posts...</h1>;
  if (error) return <h1>Error Loading Posts: <span className="loaderror">{error.message}</span></h1>;

  return (
    <ul>
      {data.allPosts.map((post: Post) =>
        <li key={post.id}>
          <h1>
            <Link to={`/post/${post.id}`}>{post.name}</Link>
          </h1>
        </li>)}
    </ul>
  );
}

export default Posts;
