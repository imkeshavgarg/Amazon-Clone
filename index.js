const express = require('express');
const app = express();
const port=5000;
const ejs = require('ejs')
app.use(express.static('/public'))
const path = require('path');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/main',(req,res)=>{
    res.render('main')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})