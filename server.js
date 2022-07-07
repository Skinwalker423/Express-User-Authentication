const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const User = require('./seeds/usersSeeds');
const File = require('./models/File');
require('dotenv').config();


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
    const {downloadCount, path, originalname } = req.file;
    console.log(downloadCount);
    console.log(path);
    console.log(originalname);
    res.redirect('/');

    // try{
    //     const file = new File({password, path, originalname,  downloadCount: downloadCount + 1});
    //     await file.save();
    //     res.redirect('/');
    // }catch(e){
    //     console.log(e);
    //     res.send(e.message)
    // }
})

app.listen(port, () => {
    console.log('listening to port 8080');
})