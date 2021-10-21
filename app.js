const express = require('express');
const path=require('path');
const methodOverride=require("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');


const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

    //Require de los ruteadores
const indexRouter=require('./src/routes/index.js');
const usersRouter=require('./src/routes/users.js');
const productsRouter=require('./src/routes/products.js');
//Routes API
const productsRouterApi = require('./src/routes/apis/products');
const usersRouterApi = require('./src/routes/apis/users');

const app = express();

//Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views")

//Configuración de la carpeta pública "public"
const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

//configuración de cors para las apis
app.use(cors());

//configuración de middlewares varios
app.use(express.urlencoded({ extended: false })); //URL encode  - Para que nos pueda llegar la información desde el formulario al req.body 
app.use(express.json()); //Para recibir los json de postman
app.use(methodOverride("_method"));
app.use(session({
    secret:"Semcreto",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);


//Configuración del puerto
app.listen(process.env.PORT || 3001,()=>{
    console.log("corriendo servidor en el puerto 3001");
});

    //Implementación de los ruteadores
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
//Rutas API
app.use('/api/products', productsRouterApi);
app.use('/api/users', usersRouterApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error404');
    // res.send("Error!:<br/><br/>"+err+"<br/><br/>( Si ves esta página, al programador se le olvidó colocar la vista de error del sitio )");
});