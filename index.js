const express = require("express");
const User = require("./models/User")
const app = express();
app.use(express.static('public'));
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://hanan0371fiaz_db_user:hanan1245@cluster0.vbl5tdn.mongodb.net/third?retryWrites=true&w=majority').then(() => console.log("MongoDb is connected")).catch(err => console.log("MongoDb connection error"));

app.use(express.urlencoded({extended: true}))
app.get("/", (req, res) => {
    res.send("Your server is Running")
})
app.get("/about", (req, res) => {
    res.send("This is about page")
})
app.get("/contact", (req, res) => {
    res.send("This is Contact page Awesome")
})
app.get("/profile/:user", (req, res) => {
    const name = req.params.user;
    res.send(`Awesome Welcome ${name}. This is your profile ${name}`)
})
app.post("/submit-data", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    await newUser.save();
    res.send(newUser);
})
// app.get("/all-massages", async (req, res) => {
//     try{

//         const messages = await User.find();
//         const htmlResponse = "All Users";
//         messages.forEach(msg => {
//             htmlResponse += `<stron>${msg.name}</strong> ${msg.message}`;
//         })
//         htmlResponse += `<a href="./index.html"> Back </a>`;
//         res.send(htmlResponse)
//     }catch(error){
//         res.status(400).send("Server Error")
//     }
// })


app.get('/all-messages', async (req, res) => {
    try {
        // Database se saare users/messages nikalna
        const messages = await User.find(); 
        
        // Ek simple HTML table ya list mein dikhana
        let htmlResponse = "<h1>Saare Messages</h1><ul>";
        
        messages.forEach(msg => {
            htmlResponse += `<li><strong>${msg.name}:</strong> ${msg.email}  || ${msg.message} </li>`;
        });
        
        htmlResponse += "</ul><a href='/'>Wapas Form par jayein</a>";
        res.send(htmlResponse);
        
    } catch (error) {
        res.status(500).send("Data lane mein masla hua.");
    }
});
const port = 3000;
