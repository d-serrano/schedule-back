const moment = require ('moment');
const Task = require( '../models/task.model' ); 
const Project = require( '../models/project.model');

// create task
const createTask = async ( req, res ) =>{
	const { body } = req;
	const { project : projectId } = req.body;
	const { hoursLeft } = req.params;
	// ceate task
	const task = new Task( body );
	task.startDate  = moment().unix();
	try {
		// save task
		const updatedProject = await  Project.findByIdAndUpdate( 
      projectId, 
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
	const { isUpdatedHours } = res.locals
	const { body } = req
	const { id } = req.params
	try {
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro la tara a actualizar' }
		// update task
		console.log('++++++++ upDate task +++++++')
														//Project.findByIdAndUpdate( id, data , {returnOriginal: false});
		const updatedTask = await Task.findByIdAndUpdate( task._id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Tarea actualizada correctamente', result : {updatedTask, isUpdatedHours} } );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'La tarea no existe', error } );
	}
}

const updateTaskHours = async ( req, res ) => {
	const { isUpdatedHours } = res.locals
	const { body } = req
	const { id } = req.params
	try {
		// update task
		console.log('++++++++ upDate task Hours +++++++')
														//Project.findByIdAndUpdate( id, data , {returnOriginal: false});
		const updatedTask = await Task.findByIdAndUpdate( task._id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Tarea actualizada correctamente', result : {updatedTask, isUpdatedHours} } );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'La tarea no existe', error } );
	}
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