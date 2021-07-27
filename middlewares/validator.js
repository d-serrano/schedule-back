const { validationResult } = require( 'express-validator' );

exports. validator = ( req, res, next ) =>{
  // verify bodt
	const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
  next();
}