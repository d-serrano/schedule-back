const jwt = require ( 'jwt-simple' );
const moment = require ( 'moment' );
const { SECRET_KEY } = require ( '../config' );

exports.ensureAuth = ( req, res, next ) => {
    if( !req.headers.authorization ){
        return res.status(403).send( { message: "La petición no tiene cabecera de autentificación" } );
    }
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try{
        var playload = jwt.decode( token, SECRET_KEY );
        if ( playload.exp <= moment.unix() ){
            return res.status(404).send({ messange: "El token ha expirado" });
        }
    }catch( ex ){
        return res.status(404).send({ message: 'Token invalido, por favor vuelve a iniciar sesión.' })
    }
    req.user=playload;
    next();
}

exports.isAdmin = ( req, res, next )=>{
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try{
        var playload = jwt.decode( token, SECRET_KEY );
        if ( !playload.isAdmin ){
            return res.status(404).send({ messange: "Debe ser un Administrador para realizar esta accion" });
        }
    }catch( ex ){
        return res.status(404).send({ message: 'Token invalido.' })
    }
    req.user=playload;
    next();
}

exports.isMember = ( req, res, next ) =>{
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
       var payload = jwt.decode( token, SECRET_KEY );
       if( payload.role !== 'member' ){
        return res.status(404).send({ messange: "Debe spertenecer a Got It para realizar esta accion" });
       }
    } catch (error) {
        return res.status(404).send({ message: 'Token invalido.' })
    }
    req.user=payload;
    next();
}