let express = require('express');
let app = express();

app.listen(process.env.PORT || 3000, function(){
    return console.log("Servidor corriendo");

}); //El servidor inicia, para pararlo, usar Ctrl+C en VSC

app.get('/', function(req, res){
    res.send('Bienvenidos al sitio'); 
});
