const mongoose = require('mongoose');

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
