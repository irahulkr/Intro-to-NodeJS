const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.use(express.static("public/css"));
app.use(express.static("public/js"));
// app.use(express.static(path.join(__dirname, "/css")));
// app.use(express.static(path.join(__dirname, "/js")));

app.set("view engine", "ejs");

app.get("/", (req, res)=> {
    res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
    let diceValue = Math.floor(Math.random()*6) + 1;
    res.render("rolldice.ejs", {diceValue})
});

app.get("/ig/:username", (req, res) => {
    let followers = ["Rahul", "Golu", "Virat", "Rohit"];
    let {username} = req.params;
    res.render("ig.ejs", {username, followers});
});

app.get("/instagram/:username", (req, res) => {
    let {username} = req.params;
    const instaData = require("./data.json")
    const data = instaData[username];
    if(data)
        res.render("instagram.ejs", {data});
    else
        res.render("error.ejs", {username});
});

app.listen(port, ()=> {
    console.log(`App is running on port ${port}`);
});