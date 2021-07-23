const moment = require ('moment');
const Proyect = require( '../models/proyect.model' ); 
//validaciones
const { validationResult } = require( 'express-validator' );

// create proyect
const create = async ( req, res ) =>{
  const { body } = req;
	// *******************************************************************
  // ****************************  Verify ******************************
  // *******************************************************************
	// verify bodt
	const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
	// ceate proyect
	const proyect = new Proyect( body );
	proyect.startDate  = moment().unix();
	try {
		// save proyect
    console.log('    --create Proyet ', proyect)
		await proyect.save();
		res.status( 200 ).send( { message: 'Proyecto creado correctamente', proyect } );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al crear el proyecto', error } );
	}
}

const get = async ( req, res ) =>{
  console.log(' get proyect')
}

const getList = async ( req, res ) =>{
	console.log(' get proyects')
  
}

const update = async ( req, res ) =>{
  let { body : data, params : { id } } = req;
  try {
    const updatedProyect = await  Proyect.findByIdAndUpdate( id, data , {returnOriginal: false});
    console.log(' upDate proyect', data, id)
    res.status(200).send({ message: 'Proyecto actualizado correctamente', updatedProyect });
	} catch (error) {
		res.status(500).send({ message: 'error al actualizar proyecto', error : error });
  }
}

const deleteOne = async ( req, res ) =>{
	console.log(' delete proyect')
  
}

module.exports = {
	create,
  get,
	getList,
	update,
  deleteOne
}