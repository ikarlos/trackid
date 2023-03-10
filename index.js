const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "your url"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
mongoose.connect(uri).then(() => {
    console.log("connection sucessfull");
}).catch((err) => {
    console.log("no connection");
})
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const UserSchema = new mongoose.Schema({
    name: String,
    password: String
});
const User = mongoose.model('User', UserSchema);




app.get("/", (req, res) => {
    res.render("home")
})
app.post('/home', (req, res) => {
    const user = new User({ name: req.body.firstName, password: req.body.password })
    user.save()
    res.redirect("/")
})
app.listen(3000, () => {
    console.log("listening to port 3000");
})
