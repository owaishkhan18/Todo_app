// create the backend for the todos app
const express =require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path =require("path");
const app = express();

const port = 3000;

// let todos=[];
app.use(bodyParser.json())  // this is the middle ware 
let todo = [];
// now here read the file from the json format 
app.get('/todos', (req, res) => {
    fs.readFile("todos.json","utf8",(err,data)=>{
        if(err) throw err;
        var answer=JSON.parse(data);
        res.send(answer);
    })
    // res.json(todo);
})

// here the some file system used to the data saved on the backend.


app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        description: req.body.description
    };
    // the data insert in the local variable 
    fs.readFile("todos.json","utf8",(err,data)=>{
      if(err)throw err;
    //   console.log(data)
const todos=JSON.parse(data);
      todos.push(newTodo);
    //   console.log(todos);
      fs.writeFile('todos.json',JSON.stringify(todos),(err)=>{
        if(err) throw err;
        res.status(201).json(newTodo);
      });
    });
});

// this is the fucntion to check wheter that id in the array or not .

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
            // console.log("hii i am here");
        }
    }
    return -1;
}
// this function is to remove the elment in the array .

function removeIndex(todos, ide) {
    let newArr = [];
    for (let i = 0; i < todos.length; i++) {
        if (i !== ide) {
            // console.log("hii there");
            newArr.push(todos[i]);
        }
    }
    return newArr;
}
// here is the delete this is to be created now .
app.delete('/todos/:id', (req, res) => {

    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) throw err;
    //   console.log(data)
    var  todos = JSON.parse(data);
     console.log(todos);
     console.log("************************");
      const   todoIndex = findIndex(todos, parseInt(req.params.id));
      if (todoIndex === -1) {
        res.status(404).send();
      } else {
        todos = removeIndex(todos, todoIndex);
        console.log(todos);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(200).send();
        });
      }
    });
  });
// console.log(todos);
// here the app is to be listen on that port number .
app.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"index.html"));
})
// app.use((req,res,next)=>{
//     res.status(404).send();
// })
app.listen(3000);
// console.log(todos)



console.log("toh kaise hai aap log ")