const moment = require ('moment');
const Project = require( '../models/project.model' ); 
const Task = require( '../models/task.model' ); 
//validaciones
const { validationResult } = require( 'express-validator' );

// create project
const create = async ( req, res ) =>{
  const { body } = req;
	// *******************************************************************
  // ****************************  Verify ******************************
  // *******************************************************************
	// verify bodt
	const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
	// ceate project
	const project = new Project( body );
	project.startDate  = moment().unix();
	project.hoursLeft  = project.hoursTotal;
	try {
		// save project
		await project.save();
		res.status( 200 ).send( { message: 'Proyecto creado correctamente', project } );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al crear el proyecto', error } );
	}
}

const get = async ( req, res ) =>{
  console.log(' get project')
}

// get tasks
const getTasks = async ( req, res ) =>{
	let { id } = req.params;
	let { offset, slice } = req.query;
	offset = parseInt(offset) || 0;
	slice = parseInt(slice) || 10;
	try {
		// find project
		let project = await Project.findById( id ).populate('tasks');
		console.log(' get tasks', { offset, slice, project })
		if( !project ){ throw 'No se encontro lel Proyecto.' }
		const { tasks } = project;
		res.status(200).send({ tasks });
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'No se pueden obtener tareas de este proyecto', error } );
	}
}

const update = async ( req, res ) =>{
  let { body : data, params : { id } } = req;
  try {
    const updatedProject = await  Project.findByIdAndUpdate( id, data , {returnOriginal: false});
    res.status(200).send({ message: 'Proyecto actualizado correctamente', updatedProject });
	} catch (error) {
		res.status(500).send({ message: 'error al actualizar proyecto', error : error });
  }
}

const deleteOne = async ( req, res ) =>{
	console.log(' delete project')
  
}

module.exports = {
	create,
  get,
	getTasks,
	update,
  deleteOne
}