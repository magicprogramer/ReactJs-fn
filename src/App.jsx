import React, { useEffect, useState } from "react";
import Post from "./Component/Post";
import NavBar from "./Component/NavBar";
import { Routes, Route } from "react-router-dom";
import EditForm from "./Component/EditForm";
import { createContext } from "react";
export const PostContext = createContext(null);
import { useNavigate } from "react-router";
import axios from "axios";
import Login from "./Component/Login";
export default function App() {
  const [Posts, setPosts] = useState([
  ]);
const url = "http://localhost:3018";
const navigate = useNavigate();
useEffect(()=>{async function getPosts(){
      const {data} = await axios.get(url+"/posts")
      setPosts(data);
    
    }
    getPosts();}, []
  );
  const handleLogin = async (data)=>{
    const res = await axios.post(url+"/login", data);
    console.log(res);
    localStorage.setItem("token", res.data['token']);
    navigate("/");
  }
  const handleLogout = async ()=>{
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleDelete = async (id) => {
    console.log("OK");
    const newPosts = Posts.filter((post) => post.id != id)
    console.log(url+"/posts/"+id);
    const token = localStorage.getItem("token") || null;
    const r = await axios.delete(url+"/posts/"+id,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    console.log(r);
    setPosts(newPosts);
  };
  const handleEdit = async (id, data) => {
    const post = Posts.find((post) => post.id == id);
    const token = localStorage.getItem("token") || null;
    
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const res = await axios.put(
        url+"/posts/"+id, 
        {...post, ...data, _id: id},
        {headers: {Authorization: `Bearer ${token}`}}
      );
  
      if (res.status < 200 || res.status >= 300) {
        alert("You are not allowed");
        return;
      }
  
      const newPost = Posts.map((post) => {
        if (post.id == id) {
          return {...post, ...data};
        }
        return post;
      });
  
      setPosts(newPost);
      navigate("/");
    } catch(err) {
      alert("You are not allowed");
    }
  }
  

  return (
    <>
      <PostContext.Provider value={Posts}>
      <NavBar handleLogout={handleLogout}></NavBar>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}></Route>
        <Route path="/posts/:id/edit" element={<EditForm handleEdit={handleEdit}/>}>
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
