const User = require('../models/User');

let midleware = function(req, res, next){
    res.locals.isLogged = false;

    if (req.cookies.userName) {
        
        let userInCookie = req.cookies.userName;
        let userFromCookie = User.findByField("nombreUsuario", userInCookie);
        
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        };
    }

    if (req.session.userLogged) {
        res.locals.isLogged =true;
        res.locals.userLogged = req.session.userLogged;
    };

    next();
}

module.exports = midleware;