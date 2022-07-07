const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
            originalName: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            downloadCount: {
                type: Number,
                required: true,
                default: 0
            },
            password: String
        })

const File = mongoose.model('File', fileSchema);


module.exports = File;