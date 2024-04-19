const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "i.rahulkr",
        content: "Hello! I'm a software developer",
    },
    {
        id: uuidv4(),
        username: "i_nehadeyy",
        content: "Welcome to my post",
    },
    {
        id: uuidv4(),
        username: "golukumar",
        content: "This is the story about....",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post})
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {id, post});
    
});

app.delete("/posts/:id/delete", (req, res) => {
    let {id} = req.params;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
    
});

app.listen(port, ()=>{
    console.log(`Server Started!! Port = ${port}`);
});