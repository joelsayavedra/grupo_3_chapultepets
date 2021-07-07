const express = require('express');
const path=require('path');

const rutasIndex=require('./src/routes/index.js');
const rutasLogin=require('./src/routes/login.js');
const rutasProductDetail=require('./src/routes/productDetail.js');
const rutasProductCart=require('./src/routes/productCart.js');
const rutasRegister=require('./src/routes/register.js');

const rutasProductCreate=require('./src/routes/productCreate.js');
const rutasProductEdit=require('./src/routes/productEdit.js');

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views")

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

app.use('/', rutasIndex);
app.use('/login', rutasLogin);
app.use('/productdetail', rutasProductDetail);
app.use('/productcart', rutasProductCart);
app.use('/register', rutasRegister);

app.use('/productcreate', rutasProductCreate);
app.use('/productedit', rutasProductEdit);