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
import CreateForm from "./Component/CreateForm";
import { Link } from "react-router-dom";
import RegisterForm from "./Component/RegisterForm";
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
  const handleRegister = async (data)=>{
    try{
      const res = await axios.post(url+"/register", data);
      console.log(res);
      navigate("/login");
    }catch(err){
      console.log("there was a problem try again");
    }

  }
  const handleLogout = async ()=>{
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleCreate = async (data)=>{
    const res = await axios.post(url+"/posts", data, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
    console.log(res);
    setPosts([...Posts, res.data]);
    navigate("/");
  }
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
        <Route path="/register" element={<RegisterForm handleRegister={handleRegister}/>}></Route>
        <Route path="/create" element={<CreateForm handleCreate={handleCreate}/>}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}></Route>
        <Route path="/posts/:id/edit" element={<EditForm handleEdit={handleEdit}/>}>
        </Route>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
  <div className="w-full max-w-2xl space-y-6">
    {Posts.map((post) => (
      <Post
        key={post.id}
        post={post}
        handleDelete={handleDelete}
      />
    ))}
  </div>

  {localStorage.getItem("token") && (
    <Link
      to="/create"
      className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
    >
      Add Post
    </Link>
  )}
</div>

          }
        ></Route>
      </Routes>
      </PostContext.Provider>
    </>
  );
}
