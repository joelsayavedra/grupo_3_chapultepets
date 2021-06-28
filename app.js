const express = require('express');
const path=require('path');

const app = express();

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/index.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/login.html'));
});

app.get('/productcart',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'));
});

app.get('/productdetail',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/productDetail.html'));
});

app.get('/register',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/register.html'));
});