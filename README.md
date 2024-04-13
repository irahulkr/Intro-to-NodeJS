Learning Node:
This is ExpressJs tutorial.

#ExpressJS
It is a Node.Js web application framework that helps us to make web applications.
It is used for server side programming.
It is a npm package.

#Uses of Express.Js:
It listens for incoming requests(GET, POST, etc).
It parses the request.
It matches responses with routes.
How to send a suitable response.

#Getting started with ExpressJS
Open the project folder in terminal > npm init > Enter details > Npm install express > Create index.js

**Ports**: Ports are logical endpoints of a network connection that is used to exchange information between a web server and a web client.

**app.listen()** in Express is like telling your app to start listening for visitors on a specific address and port, much like how Node listens for connections.



#Handling Requests
**app.use()** - It listens to all kinds of requests and its callback will execute the request.
This function is used to mount the specified middleware function(s) at the path that is being specified. It is mostly used to set up middleware for your application. 

app.use((req, res) => {
   console.log("Request Received");
});


#Sending a response
When we send a request then the outgoing HTTP request is text based. But ExpressJS parses it into an object. 

**res.send()**: This function sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array.

app.use((req, res) => {
   console.log("Request Received");
  // res.send("This is a string response");
   res.send("<h1>This is a HTML response</h1>");
});


Routing
It is a process of selecting a path for traffic in a network or between or across multiple networks.

app.get(path, callback): This function is designed to route HTTP GET requests to the specified path, associating them with designated callback functions. Its primary purpose is to link middleware to your application, facilitating the handling of GET requests at the specified route.


#Path Parameters
**req.params()** -  This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 

app.get("/:username/:id", (req, res) => {
   let {username, id} = req.params;
   res.send(`Hello this is @${username} and my id is ${id}`);
});


#Query String

http://localhost:8080/search?q=apple
app.get("/search", (req, res) => {
   let {q} = req.query;
   res.send(`<h1>You searched for ${q} </h1>`)
});

