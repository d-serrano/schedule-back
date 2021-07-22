const bcrypt =  require("bcrypt");
const moment = require ('moment');
const User = require( '../models/user.model' ); 
// services
const jwt = require('../services/tokens')
//validaciones
const { validationResult } = require( 'express-validator' );

// create user
const signUp = async ( req, res ) => {
	const { body } = req;
	// *******************************************************************
  // ****************************  Verify ******************************
  // *******************************************************************
  // verify body
  const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
	// user exist
	let existUser = await User.findOne({ email });
  if ( existUser ){ 
		return res.status(400).json({ message: 'this email is alredy taken'});
  }

	// create user
	const user = new User( body );
	user.email          = email.toLowerCase();
	user.signUpDate     = moment().unix();
	try {
		// encrypt password
		user.password = await bcrypt.hash ( password, 10 );
		console.log( ' contraseña encriptada ', user.password)
		// save user
		console.log( {user} )
	 	await user.save();
		res.status( 200 ).send( { message: 'Usuario registrado correctamente', user } );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al registrar el usuario', error } );
	}
} 
// login user 
const login = async (req, res) => {
  const { email, password } =  req.body;
	const emailLower =  email.toLowerCase();
	// verify email
	User.findOne( { email: emailLower }, ( err, userStored ) => {
		//
		if ( err ) {
			res.status(500).send({ code: 500, message: "Error del servidor.", error: err });
		} else if ( !userStored ) { // Verifiar si se encuentra el usuario en la BD 
			res.status(404).send({ code: 404, message: "Usuario no encontrado." });
		} else {
			// 
			bcrypt.compare( password, userStored.password, ( error, check ) => {
				if ( error ) {
					res.status(500).send({ code: 500, message: "Error del servidor.", error: err });
				} else if ( !check ) {  // compare passwords
					res.status(404).send({ code: 404, message: "Contraseña incorrecta" });
				} else if ( !userStored.active ) { // verify 
					res.status(401).send({ code: 401, message: "Este usuario no se encuentra activo." });
				} else{
					res.status(200).send({ 
						code: 200, 
						message: "Ingreso exitoso.", 
						accessToken  : jwt.createAccessToken( userStored ),
					});
				}
			} );
		}
	});
}


module.exports = {
	signUp,
  login
}