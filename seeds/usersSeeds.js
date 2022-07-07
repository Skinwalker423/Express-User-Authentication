const mongoose = require('mongoose');
const File = require('../models/File');

const userSchema = new mongoose.Schema({
        name: String,
        password: String,
        email: String,
        file: {type: mongoose.Schema.Types.ObjectId, ref: 'File'}
    });

const User = mongoose.model('User', userSchema);

    // const joe = new User({
    //     name: 'Joe',
    //     password: '123456',
    //     email: 'joe@gmail.com'
    // })

    // await joe.save();
    // console.log(joe);


module.exports = User;
