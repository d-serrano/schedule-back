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
  const { userName, password } = body;
	// *******************************************************************
  // ****************************  Verify ******************************
  // *******************************************************************
  // verify body
  const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
	// user exist
	let existUser = await User.findOne({ userName });
  if ( existUser ){ 
		return res.status(400).json({ message: 'this userName is alredy taken'});
  }

	// create user
	const user = new User( body );
	user.signUpDate     = moment().unix();
	user.email = user.email.toLowerCase();
	try {
		// encrypt password
		user.password = await bcrypt.hash ( password, 10 );
		// save user
	 	await user.save();
		res.status( 200 ).send( { message: 'Usuario registrado correctamente', user } );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al registrar el usuario', error } );
	}
} 
// login user 
const login = async (req, res) => {
  const { userName, password } =  req.body;
	// verify email
	User.findOne( { userName }, ( err, userStored ) => {
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
// update user
const updateUser = async ( req, res ) =>{
	let userData    = req.body;
	const { id }    = req.params;
	if ( userData.password ) {
		try {
			// hash al password
			const salt = await bcryptjs.genSalt(10);
			userData.password = await bcrypt.hash(userData.password, salt );
			   
		}catch (err){
			res.status(500).send({ message: 'error al encriptar la contraseña' });
		}
	}
	// Actulizar el ususario
	try {
		const updatedUser = await  User.findByIdAndUpdate( id, userData );
		res.status(200).send({ message: 'Usuario Actualizado correctamente', ussuario : updatedUser });
	} catch (error) {
		res.status(500).send({ message: 'error al actualizar usuario', error : error });
	}
	
}
// delete user
const deleteUser = ( req, res ) =>{
	const { id } = req.params;

	User.findOneAndDelete( {_id: id }, ( err, userDeleted ) => {
		if ( err ) {
			res.status(500).send({ code: 500, message: 'error de servidor', error: err });
		} else if ( !userDeleted ){
			res.status(404).send({ code : 400, message: 'no se ha encontrado el usuario' });
		}else{
			res.status(200).send({ code: 200, message: 'Usuario eliminado correctamente', user: userDeleted });
		}
	} );
}

module.exports = {
	signUp,
  login,
	updateUser,
	deleteUser,
}