const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("__method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const port = 8080;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'I@rience2121',
  });

//   let getRandomUser = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.userName(),
//       faker.internet.email(),
//       faker.internet.password(),
//   ];
//   }




//   let data = [];

//   for(let i = 0;i<100; i++) {
//     data.push(getRandomUser());
//   }

//   let q = `INSERT INTO user (id, username, email, password) VALUES ?`
//   try {
//     conn.query(q, [data], (result, err)=>{
//         if(err)
//             throw err;
//         console.log(result);
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   conn.end();


//Fetch and show total number of users on our app
  app.get("/", (req, res)=>{
    let q = `SELECT COUNT(*) FROM user;`;
  try {
    conn.query(q, (err, result)=>{
        if(err)
            throw err;
            let count = result[0]['COUNT(*)'];
        res.render('home.ejs', {count});
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//Fetch and show (id, email and username) of all users
app.get("/users", (req, res)=>{
    let q = `SELECT id, username, email FROM user;`;
  try {
    conn.query(q, (err, result)=>{
        if(err)
            throw err;
            let users = result;
        res.render('users.ejs', {users});
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});


//Edit route
app.get("/users/:id/edit", (req, res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id='${id}';`;
  try {
    conn.query(q, (err, result)=>{
        if(err)
            throw err;
        let user = result[0];
        res.render('edit.ejs', {user});
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});


//UPDATE ROUTE
app.patch("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {password: formPass, username:newUserName} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}';`;
  try {
    conn.query(q, (err, result)=>{
        if(err)
            throw err;
        let user = result[0];
        if(formPass != user.password)
            res.send("WRONG PASSWORD");
        else {
            let q2 = `UPDATE user SET username ='${newUserName}' WHERE id ='${id}'`;
            conn.query(q2, (err, result)=>{
                if(err)
                    throw err;
                res.redirect("/user");
            });
        }
        res.render('edit.ejs', {user});
    });
  } catch (err) {
    console.log(err);
    res.render("edit.ejs");
  }
});

  app.listen(port, ()=>{
    console.log(`Server is listening to PORT: ${port}`);
  });





  //console.log(getRandomUser());