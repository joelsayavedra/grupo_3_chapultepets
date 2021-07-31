const express = require('express');
const path=require('path');
const methodOverride=require("method-override");
const session = require('express-session');

//Require de los ruteadores
const indexRouter=require('./src/routes/index.js');
const usersRouter=require('./src/routes/users.js');
const productsRouter=require('./src/routes/products.js');

const app = express();

//Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views")

//Configuración de la carpeta pública "public"
const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

//configuración de middlewares varios
app.use(methodOverride("_method"));
app.use(session({
    secret:"Semcreto",
    resave: false,
    saveUninitialized: false
}));


//Configuración del puerto
app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

//Implementación de los ruteadores
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
