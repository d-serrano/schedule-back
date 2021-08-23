const moment = require ('moment');
const Task = require( '../models/task.model' ); 
const Project = require( '../models/project.model');

// get task
const getTask = async ( req, res ) =>{
	const { id } = req.params;
	try {
		// find task
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro la tara a actualizar' }
		res.status( 200 ).send( { code: 200, task } );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'No se ha podido obtener la tarea', error } );
	}

}

// update task
const updateTask = async ( req, res ) =>{
	const { task, project } = res.locals
	if( !Object.keys( req.body ).length ) {
		return res.status( 400 ).send( { code: 400, message: 'No hay nada que actualizar' } );
	}
	const { success, finished, description, sessions } = req.body
	// task object
	// from body requets
	task.description = description || task.description;
	task.sessions = sessions || task.sessions;
	task.member = {
		name : req.user.name,
		email : req.user.email,
		id : req.user.id,
	};
	task.success = success;
	task.finishDate = task.finishDate || moment().tz('America/Bogota').toISOString();
	task.finished = finished || success || false;

	task.state = task.finished? 'cerrado' : 'activo';
	try {
		const { id } = req.params
		// update task
		const updatedTask = await Task.findByIdAndUpdate( id , task, { returnOriginal : false } );
		// update project
		delete project?.tasks;
		console.log( 'TArea editada' )
		const projectQuery = { _id: task.project , "time._id": project?.arrayId } 
		const updateProject = { 
			$set : { 'time.$.minutesUsed': project?.timeUsed  }
		}
		const updatedProject = project ?
			await Project.updateOne( 
				projectQuery,
				updateProject, 
				{ returnOriginal : false } 
				):
			null;
		res.status( 200 ).send( { 
			message: 'Tarea actualizada',
			ProjetTimeUsed : project?.timeUsed ,
			updatedTask, 
		}  );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'Error al actualizar la tarea', error } );
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
  getTask,
	updateTask,
	updateTaskHours,
  deleteTask
}