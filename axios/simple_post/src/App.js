import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => setPost(response.data));
  }, []);

  const createPost = () => {
    axios.post(baseURL, {
        titile: 'Hello world!',
        body: 'This is a new post.'
    })
    .then((response) => setPost(response.data));
  }

  if (!post) return null;

  return (
    <div>
      hello
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}
