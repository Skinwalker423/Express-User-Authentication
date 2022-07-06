const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 8080;



const main = async() => {
    await mongoose.connect('mongodb://localhost:27017/usersDb');

    const userSchema = new mongoose.Schema({
        name: String,
        password: String,
        email: String
    });

    const User = mongoose.model('User', userSchema);

    const joe = new User({
        name: 'Joe',
        password: '123456',
        email: 'joe@gmail.com'
    })

    await joe.save();
    console.log(joe);
}

main().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('listening to port 8080');
})