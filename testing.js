const bcryptjs = require('bcryptjs');

let hash = console.log(bcryptjs.hashSync("123456", 10));

console.log(bcryptjs.compareSync("123456", "$2a$10$WFsj9eBSeP7iFAah0YOaxuegvs4Qk9Vt.WJigtkr79YSJeB3IcZAG"));

let usuario = {
    id: "req.body.nombreUsuario",
    userName: "req.body.nombreUsuario",
    currentName: "req.body.nombreUsuario",
    lastname: "req.body.nombreUsuario",
    email: "req.body.nombreUsuario",
    password: "req.body.nombreUsuario",
    celNumber: "req.body.nombreUsuario",
};

if (1 == 2) {
    usuario.picture = "req.body.nombreUsuario";
} else {
    usuario.picture = "default.png";
};

console.log(usuario)