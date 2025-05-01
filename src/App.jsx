import React, { useEffect, useState } from "react";
import Post from "./Component/Post";
import NavBar from "./Component/NavBar";
import { Routes, Route } from "react-router-dom";
import EditForm from "./Component/EditForm";
import { createContext } from "react";
export const PostContext = createContext(null);
import { useNavigate } from "react-router";
import axios from "axios";
export default function App() {
  const [Posts, setPosts] = useState([
  ]);
const url = "http://localhost:6003/";
const navigate = useNavigate();
useEffect(()=>{async function getPosts(){
      const {data} = await axios.get(url+"posts/");
      //console.log(data.data);
      setPosts(data);
    
    }
    getPosts();}, []
  );
  
  const handleDelete = (id) => {
    console.log("OK");
    const newPosts = Posts.filter((post) => post.id != id);
    const r = axios.delete(url+"posts/"+id);
    console.log(r);
    setPosts(newPosts);
  };
  const handleEdit = async (id, data)=>{
    const post = Posts.find((post) => post.id == id);
    console.log({...post, ...data, id : id});
   // return ;
    const res = await axios.put(url+"posts/"+id, {...post, ...data, id : id});
    console.log(res);
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
