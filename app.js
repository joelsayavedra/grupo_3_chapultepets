const express = require('express');
const path=require('path');
const methodOverride=require("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

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
app.use(cookies());
app.use(userLoggedMiddleware);

//Configuración del puerto
app.listen(process.env.PORT || 3000,()=>{
    console.log("corriendo servidor en el puerto 3000");
});

//Implementación de los ruteadores
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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
});