const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const User = require('./seeds/usersSeeds');
const File = require('./models/File');
require('dotenv').config();
const bcrypt = require('bcrypt')

const app = express();

const port = process.env.PORT;



const main = async() => {
    mongoose.connect(process.env.DATABASE_URL);
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

app.post('/search', upload.single('file'), async(req, res) => {
    const {password} = req.body;
    const { path, originalname } = req.file;

    const fileData = {
        path,
        originalName: originalname,
    }

    if(password != null && password !== ''){
        fileData.password = await bcrypt.hash(password, 10)
    }

    try{
        const file = await File.create(fileData);
        console.log(file);
        res.render('home', {fileLink: `${req.headers.origin}/file/${file.id}`, file })
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
})


app.get('/file/:id', async(req, res) => {
    const {id} = req.params;
    
    const file = await File.findById(id);
    file.downloadCount += 1;
    await file.save();
    console.log(file);

    res.download(file.path, file.originalName);
})

app.listen(port, () => {
    console.log('listening to port 8080');
})