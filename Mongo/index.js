const mongoose = require('mongoose');

main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema); 

const user1 = new User({name: "Rahul", email: "i.rahulkr21@gmail.com", age: 25});
user1.save();

const user2 = new User({name: "Golu", email: "i.golu21@gmail.com", age: 25});
user2.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});


User.insertMany([
    {name: "Neha", email: "i.neha07@gmail.com", age: 25},
    {name: "Virat", email: "i.virat18@gmail.com", age: 36},
]).then((data)=>{
    console.log(data);
});

User.find({}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

User.updateOne({name: "Virat"}, {age: 40}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

