const express = require('express');     //This express is a function which we are going to execute.
const app = express();         //The value returned by the express() function is stored in the app variable and this app will help us to create the server side app.

//console.dir(app);

let port = 8080;

app.listen(port, ()=> {
    console.log(`My server is running in port ${port}`);
});
// app.listen listens to incoming API requests for the given port.

// app.use((req, res) => {
//     console.log("Request Received");
//    // res.send("This is a string response");
//     res.send("<h1>This is a HTML response</h1>");
// });
// It listens to all kinds of requests and its callback will execute the request.

app.get("/", (req, res) => {
    res.send("You contacted root path");
});

app.get("/home", (req, res) => {
    res.send("You contacted home path")
});

// app.get("*", (req, res) => {
//     res.send("You contacted invalid path")
// });

app.get("/:username/:id", (req, res) => {
    let {username, id} = req.params;
    res.send(`Hello this is @${username} and my id is ${id}`);
});

app.get("/search", (req, res) => {
    let {q} = req.query;
    res.send(`<h1>You searched for ${q} </h1>`)
});
