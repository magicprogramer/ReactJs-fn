import React, { useEffect, useState } from "react";
import Post from "./Component/Post";
import NavBar from "./Component/NavBar";
import { Routes, Route } from "react-router-dom";
import EditForm from "./Component/EditForm";
import { createContext } from "react";
export const PostContext = createContext(null);
import { useNavigate } from "react-router";
export default function App() {
  
const navigate = useNavigate();
  useEffect(function () {
    console.log("render");
  });
  const [Posts, setPosts] = useState([
    {
      id: 1,
      title: "first post",
      body: "hello world every one this is a test",
      user: { name: "ahmed" },
    },
    {
      id: 2,
      title: "second post",
      body: "hello world every one this is a test",
      user: { name: "mahmed" },
    },
    {
      id: 3,
      title: "thirdt post",
      body: "hello world every one this is a test",
      user: { name: "ahmed" },
    },
  ]);
  const handleDelete = (id) => {
    console.log("OK");
    const newPosts = Posts.filter((post) => post.id != id);
    setPosts(newPosts);
  };
  const handleEdit = (id, data)=>{
    const newPost = Posts.map((post)=>{
      if (post.id == id)
      {
        return {...post, ...data}
      }
      return post;
    });
    console.log(newPost);
    setPosts(newPost);
    navigate("/");
  }

  return (
    <>
      <PostContext.Provider value={Posts}>
      <NavBar></NavBar>
      <Routes>
        <Route path="posts/:id/edit" element={<EditForm handleEdit={handleEdit}/>}>
        </Route>
        <Route
          path="/"
          element={
            <div className="grid grid-rows-3">
              {Posts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    className="row-start-2 border-amber-700"
                    post={post}
                    handleDelete={handleDelete}
                  ></Post>
                );
              })}
            </div>
          }
        ></Route>
      </Routes>
      </PostContext.Provider>
    </>
  );
}
