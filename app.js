let express = require('express');
let app = express();
let saludo = 'Holis UuU';

app.listen(3000, function(){
    return console.log("Servidor operativo y funcionando en 3000");
}); //El servidor inicia, para pararlo, usar Ctrl+C en VSC

app.get('/', function(req, res){
    res.send('Bienvenidos al sitio'); 
});
