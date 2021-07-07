const express = require('express');
const path=require('path');

const rutasIndex=require('./routes/index');
const rutasLogin=require('./routes/login');
const rutasProductDetail=require('./routes/productDetail');
const rutasProductCart=require('./routes/productCart');
const rutasRegister=require('./routes/register');

const app = express();

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", "./src/views")

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

app.use('/', rutasIndex);
app.use('/login', rutasLogin);
app.use('/productDetail', rutasProductDetail);
app.use('/productCart', rutasProductCart);
app.use('/register', rutasRegister);