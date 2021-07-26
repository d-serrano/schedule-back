const moment = require ('moment');
const Task = require( '../models/task.model' ); 
const Project = require( '../models/proyect.model');
//validaciones
const { validationResult } = require( 'express-validator' );

// create task
const createTask = async ( req, res ) =>{
	const { body } = req;
	const { proyect : proyectId } = req.body;
	const { hoursLeft } = req.params;
	// *******************************************************************
  // ****************************  Verify ******************************
  // *******************************************************************
	// verify bodt
	const errors = validationResult( req );
  if ( !errors.isEmpty() ) return  res.status( 400 ).json({ errores : errors.array() });
	// ceate task
	const task = new Task( body );
	task.startDate  = moment().unix();
	try {
		// save task
		const updatedProject = await  Project.findByIdAndUpdate( 
      proyectId, 
      { hoursLeft : hoursLeft , $push: { tasks: task._id } }, 
      {returnOriginal: false}
    );
		await task.save();
		res.status( 200 ).send( { message: 'Tarea creada correctamente', result : {task, updatedProject} } );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al crear a tarea', error } );
	}
}
// get task
const getTask = async ( req, res ) =>{
  console.log(' get task')
}
// get taska
const getTasks = async ( req, res ) =>{
	console.log(' get tasks')
  
}
// update task
const updateTask = async ( req, res ) =>{
	const { task, isUpdatedHours } = res.locals
	const { body } = req
	try {
		// update task
		console.log('++++++++ upDate task +++++++')
														//Proyect.findByIdAndUpdate( id, data , {returnOriginal: false});
		const updatedTask = await Task.findByIdAndUpdate( task._id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Tarea actualizada correctamente', result : {updatedTask, isUpdatedHours} } );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'La tarea no existe', error } );
	}
  //res.status( 200 ).send( {body} );
}
// delete tasks
const deleteTask = async ( req, res ) =>{
	console.log(' +++++++++++ delete task ++++++++++ ')
}

module.exports = {
	createTask,
  getTask,
	getTasks,
	updateTask,
  deleteTask
}