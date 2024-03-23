const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
//Task #1
////return res.send(JSON.stringify(books,null,4))
//Task #10
let booksstored = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4))
    },1000)})
    booksstored.then((successMessage) => {
        return res.send(successMessage)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Task #2
  ////const isbn = req.params.isbn;
  ////return res.send(books[isbn])
  //Task #11
  let bookisbn = new Promise((resolve,reject) => {
    setTimeout(() => {
      isbn = req.params.isbn;  
      resolve(books[isbn])
    },1000)})
    bookisbn.then((successMessage) => {
        return res.send(successMessage)
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Task #3
    ////const name= req.params.author.replaceAll("-"," ");
    ////for (const key in books){
    ////const author = books[key]["author"];
    ////if (name == author){
    ////    res.send(books[key])
    ////}
    ////}
    //Task#12
    let bookauthor = new Promise((resolve,reject) => {
        setTimeout(() => {
            const name= req.params.author.replaceAll("-"," ");
            for (const key in books){
                const author = books[key]["author"];
                if (name == author){
                    resolve(books[key])
                }
            }
        },1000)})
        bookauthor.then((successMessage) => {
            return res.send(successMessage)
        })

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Task #4
    ////const name= req.params.title.replaceAll("-"," ");
    ////for (const key in books){
    ////const title = books[key]["title"];
    ////if (name == title){
    ////    res.send(books[key])
    ////}
    ////}
    //Task #13
    let bookitem = new Promise((resolve,reject) => {
        setTimeout(() => {
            const name= req.params.title.replaceAll("-"," ");
            for (const key in books){
            const title = books[key]["title"];
            if (name == title){
                resolve(books[key])
            }
            }
        },1000)})
        bookitem.then((successMessage) => {
            return res.send(successMessage)
        })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book){
    let review = req.body.reviews;
    res.send(book["reviews"])
  }
  

});

module.exports.general = public_users;
