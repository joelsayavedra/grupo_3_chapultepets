const express = require('express');

const rutasIndex=require('./src/routes/index.js');
const rutasLogin=require('./src/routes/login.js');
const rutasProductDetail=require('./src/routes/productDetail.js');
const rutasProductCart=require('./src/routes/productCart.js');
const rutasRegister=require('./src/routes/register.js');

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views")

app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

app.use('/', rutasIndex);
app.use('/login', rutasLogin);
app.use('/productDetail', rutasProductDetail);
app.use('/productCart', rutasProductCart);
app.use('/register', rutasRegister);