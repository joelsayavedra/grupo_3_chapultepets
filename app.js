const express = require('express');
const path=require('path');

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views")

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/productcart',(req,res)=>{
    res.render('productCart');
});

app.get('/productdetail',(req,res)=>{
    res.render('productDetail');
});

app.get('/register',(req,res)=>{
    res.render('register');
});