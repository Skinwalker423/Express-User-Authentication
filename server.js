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

app.use(express.urlencoded({ extended: true }));

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


const handleDownload = async(req, res) => {
    const {id} = req.params;
    const file = await File.findById(id);

    if(file.password != null){
        if(req.body.password == null){
            console.log('redirected to password form', req.body.password);
            res.render('password', {file, id});
            return;
        }
    }



    if(!await bcrypt.compare(req.body.password, file.password)){
        res.render('password', {error: true});
    }

    file.downloadCount += 1;
    await file.save();
    console.log(file);

    console.log('made it passed bcrypt');
    res.download(file.path, file.originalName);
}

app.get('/file/:id', handleDownload);
app.post('/file/:id', handleDownload);


app.listen(port, () => {
    console.log('listening to port 8080');
})