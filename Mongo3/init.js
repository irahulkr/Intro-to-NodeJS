const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
    from: "Rahul",
    to: "Neha",
    message: "Hi Neha! Are you SDE at Amazon?",
    created_at: new Date(),
});

chat1.save().then((res)=>{
    console.log(res);
});

let allChats = [
    {
        from: "Neha",
        to: "Rahul",
        message: "No, I'm an escalation Manager at Amazon",
        created_at: new Date(),
    },
    {
        from: "Golu",
        to: "Virat",
        message: "How are you",
        created_at: new Date(),
    },
    {
        from: "Rohit",
        to: "Hardik",
        message: "LOL!!",
        created_at: new Date(),
    },
    {
        from: "Shubham",
        to: "Mohit",
        message: "Lets play cricket",
        created_at: new Date(),
    },
]

Chat.insertMany(allChats);

