import React, { useState } from "react";
import Post from "./Component/Post";
import NavBar from "./Component/NavBar";

export default function App() {
  const [Posts, setPosts] = useState([
    {
      title: "first post",
      body: "hello world every one this is a test",
      user: { name: "ahmed" },
    },
    {
      title: "second post",
      body: "hello world every one this is a test",
      user: { name: "mahmed" },
    },
    {
      title: "thirdt post",
      body: "hello world every one this is a test",
      user: { name: "ahmed" },
    },
  ]);
  return (
    <>
      <NavBar></NavBar>
      <div className="grid grid-rows-3">
        {Posts.map((post) => {
          return (
            <Post
              className="row-start-2 border-amber-700"
              title={post.title}
              body={post.body}
              user={post.user}
            ></Post>
          );
        })}
      </div>
    </>
  );
}
