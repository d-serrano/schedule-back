//const moment = require ('moment');
const moment = require('moment-timezone');
const Task = require( '../models/task.model' ); 
const Project = require( '../models/project.model');


// create requirement
const createReq = async ( req, res ) =>{
	const { body, user,user : { name, id } } = req;
	const { project : projectId } = req.body;
	const { hoursLeft } = req.params;
	// ceate task
	const task = new Task( body );
	task.requirmentDate  =  moment().tz('America/Bogota').toISOString();
	task.requieredUser ={ id, name	};

	console.log( moment().tz('America/Bogota').toISOString())
	console.log( task.requirmentDate )
	try {
		// update project
		const updatedProject = await  Project.findByIdAndUpdate( 
			projectId, 
      { hoursLeft : hoursLeft , $push: { tasks: task._id } }, 
      {returnOriginal: false}
		);
		const { type, companyRef, tasks } = updatedProject;
		let typeRef = type.slice( 0, 1 ).toUpperCase();
		let yearRef = moment().toDate().getFullYear();
		let numberRef = tasks.length.toString().padStart( 4, '0' );

		task.ref = `${ companyRef }-${ typeRef }${ numberRef }-${ yearRef }.`.replace('.','');
			// save task
		await task.save();
		res.status( 200 ).send( { message: 'Requerimiento creado correctamente', task}  );
	} catch (error) {
		res.status( 500 ).send( { message: 'Hubo un error al crear a tarea', error } );
	}
}

// get req
const getReq = async ( req, res ) =>{
	const { id } = req.params;
	try {
		// find task
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro el requerimiento' }
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'No se ha podido obtener la tarea', error } );
	}

}

// update requirement
const updateReq = async ( req, res ) =>{
	
	const { isUpdatedHours } = res.locals
	const { body } = req
	const { id } = req.params
	const { role } = req.user

	if(  role ){
		return res.status( 401 ).send( { code: 401, message: 'No puedes editar un requerimiento' } );
	}
	try {
		// find requeriment
		let task = await Task.findById( id );
		if( !task ){ throw 'No se encontro el requirimiento a actualizar' }
		if( task.isTask ){ 
			return res.status( 400 ).send( { 
				code: 400, 
				message: 'No puedes editar un requerimiento que ya ha sido registrado como tarea'
			} );
		}
		// update requeriment
		const updatedTask = await Task.findByIdAndUpdate( id , body, { returnOriginal : false } );
		res.status( 200 ).send( { message: 'Requerimiento actualizado correctamente', updatedTask} );
	} catch (error) {
		res.status( 400 ).send( { code: 400, message: 'El requerimiento no existe', error } );
	}
}

// Set As Task
const setAsTask = async ( req, res ) =>{
	
}



module.exports = {
  createReq,
  getReq,
	updateReq,
	setAsTask,
}