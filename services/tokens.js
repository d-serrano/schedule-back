const jwt = require ( 'jwt-simple' );
const moment = require ( 'moment' );
const { SECRET_KEY } = require ( '../config' );

exports.createAccessToken =  user => {
    const playload ={
        id          : user.id,
        createToken : moment().unix(),
        exp: moment().add( 24, 'hours' ).unix()
    }
    return jwt.encode( playload, SECRET_KEY );
}

exports.decodedToken = token => {
  return jwt.decode( token, SECRET_KEY, true );
}