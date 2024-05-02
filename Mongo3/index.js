const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));



main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get("/", (req, res)=>{
    
    res.send("Homepage");
});

//Index Route - Show all chats
app.get("/chats", async (req, res)=>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
});

//New route
app.get("/chats/new",  (req, res)=>{
    res.render("new.ejs");
});

//Create chat
app.post("/chat/create",  (req, res)=>{
    let {from, message, to} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    
    newChat.save().then((res)=>{
        console.log("Chat was saved");
    }).catch((err)=>{
        console.log(err);
    });

     res.redirect("/chats");
 });

 //Edit route
app.get("/chats/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
     res.render("edit.ejs", {chat});
 });

//Update Route
 app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {message: newMessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMessage}, {runValidators: true, new: true});
    res.redirect("/chats");
 });

 //Delete Route
 app.delete("/chats/:id/delete", async (req, res)=>{
    let {id} = req.params;
    let chatToBeDeleted = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
 });


app.listen(8080, ()=>{
    console.log("App started on server port 8080");
});