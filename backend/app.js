const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = "IT_ITI_1234";
const app = express();
const bcrypt = require("bcrypt");

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/reactjs", {});

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  user: {
    name: String,
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
function auth(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(404).json("invalid");
  console.log(token);
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(404).json("error");
    //console.log("decrypt "+user.name);
    req.user = user.name;
    next();
  });
}

app.get("/posts/:id", async (req, res) => {
  const data = await Post.findOne({ _id: req.params.id });
  return res.json(data);
});
app.put("/posts/:id", async (req, res) => {
  console.log(req.body);
  await Post.updateOne({ _id: req.params.id }, { $set: req.body });
  return res.send("done !");
});
app.get("/posts", async (req, res) => {
  //res.json("hello world");
  let page = parseInt(req.query.page);
  const siz = 3;
  let data = null;
  const total = await Post.countDocuments({});
  const fin = Math.ceil(total / siz);
  if (page) {
    let start = (page - 1) * siz + 1;
    data = await Post.find({})
      .skip(start - 1)
      .limit(siz);
  } else {
    data = await Post.find({});
  }
  data = data.map((post) => {
    const { _id, ...rest } = post.toObject();
    return { id: _id, ...rest };
  });
  res.json({ data, fin });
});

app.post("/posts", auth, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    user: { name: req.user },
  });
  await post.save();
  console.log("req " + req.user);
  // console.log("post : " + post);
  const data = { ...post, id: post._id };
  delete data._id;
  res.json(data);
});

app.delete("/posts/:id", auth, async (req, res) => {
  if (req.user != (await Post.findOne({ _id: req.params.id })).user.name) {
    return res.status(201).json("not allowed " + req.user);
  }
  await Post.deleteOne({ _id: req.params.id });
  res.send("done !");
});

app.post("/register", async (req, res) => {
  //  return res.json("OK");
  if (!req.body.password || !req.body.name) {
    return res.status(404).json("something wrong");
  }
  //  res.send(User.findOne({name: req.body.name}));
  const exist = await User.findOne({ name: req.body.name });
  if (exist) {
    return res.status(404).json("user already exists");
  }
  const user = new User({
    name: req.body.name,
    password: await bcrypt.hash(req.body.password, 9),
  });
  await user.save();
  return res.status(201).json(user);
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(404).json("user not found");
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    return jwt.sign({ name: user.name }, secret, (err, token) => {
      if (err) return res.status(404).json("error");
      console.log(token);
      return res.status(200).json({ token: token });
    });
  }

  return res.status(404).json("wrong password");
});
const port = 3018;
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
