/**
 * Backend application listening on port 5555 that accepts Restful APIs.
 * 
 * 1- GET /list : API returns the whole cart list in json format
 * 2- POST /item/add : API that receives a new cart item as a json request and adds it to the current cart list
 */

const express = require('express');
const app = express(); // creates an express application
app.use(express.json()); // this will make the app parse json body sent in the POST request
app.set('view engine', 'ejs');

const cartList = [
    { id: 1, name: "Laptop", description: "512 MB ram, webcam, microphone, keyboard", price: 20, amount: 2 },
    { id: 2, name: "Watch", description: "Water Resistant watch", price: "$11", amount: 1 },
    { id: 3, name: "Book", description: "Psychology book wrote by Hassan in 1970", price: 100, amount: 1 },
    { id: 4, name: "Fresh Juice", description: "Orange juice squeezed 10 minutes ago", price: 2, amount: 6 },
    { id: 5, name: "Car", description: "Car that has 4 wheels, 4 seats, and works on Gas", price: 900, amount: 1 }
];

/* Get HTTP Requests */

/* 
 * Cart List Page 
 * Cart List page will be navigated to when pressing the "Cart List" button.
 * In this page you will send a GET /list request and show the data in a 
 * tabular format (not json).
 */
app.get('/list', (req, res) => {
    res.send(cartList);
});

/*
 * Home Page
 * Home page containing 2 buttons "Cart List" and "Add Item" and each 
 * button will navigate to a different page
 */
app.get('/home', (req, res) => {
    res.render('home');
    // res.send("Hello World!");
});

/*
 * Add Item Page
 * Add Item page will be navigated to when pressing the "Add Item" button. 
 * In this page you will show 4 different input fields (name, description, 
 * price, amount) and an "Add" button. You will send a POST /item/add 
 * request and show that the request was successful.
*/
app.get('/addItem', (req, res) => {
    res.send("Add Item Page");
});

/* POST HTTP Requests */
app.post('/item/add', (req, res) => {
    /* Input validation on POST requests */
    if (!req.body.name || req.body.name.length < 3) { // if name doesn't exist in the body or its length < 3
        res.status(400).send("Name is required and should be minimum 3 characters");
        return; // to prevent the execution of the rest of the code
    }

    if (!req.body.description || req.body.description.length < 10) { // if description doesn't exist in the body or its length < 10
        res.status(400).send("Description is required and should be minimum 3 characters");
        return; // to prevent the execution of the rest of the code
    }

    if (!req.body.price || req.body.price <= 0) { // if price doesn't exist in the body or it's <= 0
        res.status(400).send("Price is required and should be a positive number");
        return; // to prevent the execution of the rest of the code
    }

    if (!req.body.amount || req.body.amount <= 0) { // if amount doesn't exist in the body or it's <= 0
        res.status(400).send("Amount is required and should be a positive number");
        return; // to prevent the execution of the rest of the code
    }

    const item = {
        id: cartList.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount
    };
    cartList.push(item);
    res.send(item);
});

app.listen(5555, () => console.log("Listening on port 5555"));