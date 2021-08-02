const jwt = require ( 'jwt-simple' );
const moment = require ( 'moment' );
const { SECRET_KEY } = require ( '../config' );

exports.createAccessToken =  user => {
    const playload ={
        id          : user.id,
        name : user.name,
        isAdmin : user.isAdmin,
        role : user.role,
        email : user.email,
        cellphone : user.cellphone,
        company : user.company,
        createToken : moment().unix(),
        exp: moment().add( 24, 'hours' ).unix()
    }
    return jwt.encode( playload, SECRET_KEY );
}

exports.decodedToken = token => {
  return jwt.decode( token, SECRET_KEY, true );
}