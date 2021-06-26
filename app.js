let express = require('express');
let app = express();

<<<<<<< HEAD
app.listen(process.env.PORT || 3000, function(){
    return console.log("Servidor corriendo");
=======
app.listen(3000, function(){
    return console.log("Servidor operativo y funcionando en 3000");
>>>>>>> d528555a047f86c68146e85d54375cfe344f29e3
}); //El servidor inicia, para pararlo, usar Ctrl+C en VSC

app.get('/', function(req, res){
    res.send('Bienvenidos al sitio'); 
});
