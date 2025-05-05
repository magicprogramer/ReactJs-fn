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
import InfiniteScroll from "react-infinite-scroll-component";

export default function App() {
  const [Posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [parsedPosts, setParsedPosts] = useState(0);
  const url = "http://localhost:3018";
  const [finish, setFinish] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("render");
  });
  useEffect(() => {
    setFinish(false);
    setPosts([]);
    setPage(1);
    navigate("/");
  }, [reset]);
  async function getPosts(reset) {
    if (reset) {
      navigate("/");
    }
    const res = await axios.get(url + "/posts?page=" + page);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { data, fin } = res.data;
    console.log(fin);
    const newPage = page;
    setPage((prev) => prev + 1);
    if (newPage == fin) {
      setFinish(true);
    }
    // setParsedPosts((prev) => prev + data.length);
    setPosts((prev) => [...prev, ...data]);
    console.log(Posts);
    console.log("page" + page);
  }
  const resetFeed = () => {
    setPosts([]);
  };
  const handleLogin = async (data) => {
    const res = await axios.post(url + "/login", data);
    console.log(data);
    localStorage.setItem("token", res.data["token"]);
    localStorage.setItem("user", data["name"]);
    navigate("/");
  };
  const handleRegister = async (data) => {
    try {
      const res = await axios.post(url + "/register", data);
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log("there was a problem try again");
    }
  };
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleImage = async (data) => {
    const d = new FormData();
    d.append("title", data.title);
    d.append("body", data.body);
    if (data.image?.[0]) {
      d.append("image", data.image[0]);
    }
    return d;
  };
  const handleCreate = async (data) => {
    const d = await handleImage(data);
    const res = await axios.post(url + "/posts", d, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log(res);
    const image = res.data;
    setReset((prev) => !prev);
  };
  const handleDelete = async (id) => {
    console.log("OK");
    const newPosts = Posts.filter((post) => post.id != id);
    console.log(url + "/posts/" + id);
    const token = localStorage.getItem("token") || null;
    const r = await axios.delete(url + "/posts/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
      data = handleImage(data);
      const res = await axios.put(
        url + "/posts/" + id,
        { ...post, ...data, _id: id, image: data.image || post.image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status < 200 || res.status >= 300) {
        alert("You are not allowed");
        return;
      }

      const newPost = Posts.map((post) => {
        if (post.id == id) {
          return { ...post, ...data };
        }
        return post;
      });

      setPosts(newPost);
      navigate("/");
    } catch (err) {
      alert("You are not allowed");
    }
  };

  return (
    <>
      <PostContext.Provider value={Posts}>
        <NavBar handleLogout={handleLogout}></NavBar>
        <Routes>
          <Route
            path="/register"
            element={<RegisterForm handleRegister={handleRegister} />}
          ></Route>
          <Route
            path="/create"
            element={<CreateForm handleCreate={handleCreate} />}
          ></Route>
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          ></Route>
          <Route
            path="/posts/:id/edit"
            element={<EditForm handleEdit={handleEdit} />}
          ></Route>
          <Route
            path="/"
            element={
              <InfiniteScroll
                dataLength={Posts.length}
                next={getPosts}
                hasMore={!finish}
                loader={
                  <div className="w-full h-[30vh] flex items-center justify-center overflow-hidden">
                    <span className="loading loading-infinity w-16 h-16 scale-[3]"></span>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
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
              </InfiniteScroll>
            }
          ></Route>
        </Routes>
      </PostContext.Provider>
    </>
  );
}
