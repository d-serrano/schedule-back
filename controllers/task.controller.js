const moment = require ('moment');
const Task = require( '../models/task.model' ); 
const Project = require( '../models/project.model');

// create task
const createTask = async ( req, res ) =>{
	const { body, user,user : { name, id } } = req;
	const { project : projectId } = req.body;
	const { hoursLeft } = req.params;
	// ceate task
	console.log({ body })
	const task = new Task( body );
	task.requirmentDate  = moment();
	task.contact  = body.contact || user.name +' : ' + user.cellphone;
	task.requieredUser ={ id, name	};
	try {
		// update project
		const updatedProject = await  Project.findByIdAndUpdate( 
			projectId, 
      { hoursLeft : hoursLeft , $push: { tasks: task._id } }, 
      {returnOriginal: false}
		);
			// save task
		await task.save();
		res.status( 200 ).send( { message: 'Tarea creada correctamente', task}  );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al crear a tarea', error } );
	}
}
// get task
const getTask = async ( req, res ) =>{
	const { id } = req.params;
	try {
		// find task
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro la tara a actualizar' }
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'No se ha podido obtener la tarea', error } );
	}

}
// update task
const updateTask = async ( req, res ) =>{
	const { isUpdatedHours } = res.locals
	const { body } = req
	const { id } = req.params
	try {
		// find task
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro la tara a actualizar' }

		// update task
		const updatedTask = await Task.findByIdAndUpdate( task._id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Tarea actualizada correctamente', result : {updatedTask, isUpdatedHours} } );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'La tarea no existe', error } );
	}
}

const updateTaskHours = async ( req, res ) => {
	const { isUpdatedHours, task } = res.locals
	const { body } = req
	const { id, hoursLeft } = req.params
	try {
		// update Project hours
		const updatedProject = await  Project.findByIdAndUpdate( 
			task.project, 
      { hoursLeft }, 
      {returnOriginal: false}
		);
		// update task
		const updatedTask = await Task.findByIdAndUpdate( id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Tarea actualizada correctamente', result : {updatedTask, isUpdatedHours, hoursLeft : updatedProject.hoursLeft} } );
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
	updateTask,
	updateTaskHours,
  deleteTask
}