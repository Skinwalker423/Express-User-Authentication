const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./seeds/usersSeeds');
const app = express();

const port = 8080;



const main = async() => {
    await mongoose.connect('mongodb://localhost:27017/usersDb');
}

main().catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/search', (req, res) => {
    res.render('search-bar');
})

app.post('/search', async(req, res) => {
    const formData = req.body;
    console.log(formData);
    const user = new User(formData);
    await user.save();
    res.redirect('/');
})

app.listen(port, () => {
    console.log('listening to port 8080');
})