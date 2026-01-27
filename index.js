// const express = require("express");
// const User = require("./models/User")
// const app = express();
// app.use(express.static('public'));
// const mongoose = require("mongoose")
// mongoose.connect('').then(() => console.log("MongoDb is connected")).catch(err => console.log("MongoDb connection error"));

// app.use(express.urlencoded({extended: true}))
// app.get("/", (req, res) => {
//     res.send("Your server is Running")
// })
// app.get("/about", (req, res) => {
//     res.send("This is about page")
// })
// app.get("/contact", (req, res) => {
//     res.send("This is Contact page Awesome")
// })
// app.get("/profile/:user", (req, res) => {
//     const name = req.params.user;
//     res.send(`Awesome Welcome ${name}. This is your profile ${name}`)
// })
// app.post("/submit-data", async (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         message: req.body.message
//     })
//     await newUser.save();
//     res.send(newUser);
// })
// // app.get("/all-massages", async (req, res) => {
// //     try{

// //         const messages = await User.find();
// //         const htmlResponse = "All Users";
// //         messages.forEach(msg => {
// //             htmlResponse += `<stron>${msg.name}</strong> ${msg.message}`;
// //         })
// //         htmlResponse += `<a href="./index.html"> Back </a>`;
// //         res.send(htmlResponse)
// //     }catch(error){
// //         res.status(400).send("Server Error")
// //     }
// // })


// app.get('/all-messages', async (req, res) => {
//     try {
//         // Database se saare users/messages nikalna
//         const messages = await User.find(); 
        
//         // Ek simple HTML table ya list mein dikhana
//         let htmlResponse = "<h1>Saare Messages</h1><ul>";
        
//         messages.forEach(msg => {
//             htmlResponse += `<li><strong>${msg.name}:</strong> ${msg.email}  || ${msg.message} </li>`;
//         });
        
//         htmlResponse += "</ul><a href='/'>Wapas Form par jayein</a>";
//         res.send(htmlResponse);
        
//     } catch (error) {
//         res.status(500).send("Data lane mein masla hua.");
//     }
// });
// const port = 3000;




const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Your server is Running 🚀");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

app.get("/contact", (req, res) => {
  res.send("This is Contact page Awesome");
});

app.get("/profile/:user", (req, res) => {
  const name = req.params.user;
  res.send(`Awesome Welcome ${name}. This is your profile`);
});

app.post("/submit-data", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

app.get("/all-messages", async (req, res) => {
  const messages = await User.find();
  res.json(messages);
});

// ❌ app.listen nahi hoga
module.exports = app;
