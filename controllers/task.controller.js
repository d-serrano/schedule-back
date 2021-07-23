const moment = require ('moment');
const Task = require( '../models/task.model' ); 
// services
const jwt = require('../services/tokens')
//validaciones
const { validationResult } = require( 'express-validator' );

// create task
const createTask = async ( req, res ) =>{
  const { body } = req;
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
		await task.save();
		res.status( 200 ).send( { message: 'Tarea creada correctamente', task } );
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
	console.log(' upDate task')
  
}
// delete tasks
const deleteTask = async ( req, res ) =>{
	console.log(' delete task')
  
}

module.exports = {
	createTask,
  getTask,
	getTasks,
	updateTask,
  deleteTask
}