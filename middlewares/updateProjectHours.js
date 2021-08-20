const Project = require( '../models/project.model');
const Task = require( '../models/task.model');

const updateTime = async ( projectId, time, prevTime ) =>{
  try {
    let project = await Project.findById(  projectId )
    if( !project ) { throw 'No se ha encontrado proyecto para esta tarea' }
    // changed hours in project
    const projectTime = project.time[ project.currentMonth - 1 ];

    const timeUsed =  projectTime.minutesUsed - prevTime + time ;
    // set new time
    let projectData = { timeUsed, id : projectId, arrayId :  project.time[ project.currentMonth - 1 ]._id };

    return  projectData;
  } catch (error) {
    throw{ message : 'Hubo un error al vincular con proyecto', error} 
  }
}

exports.timeChanged = async ( req, res, next ) => {
  const { id } = req.params;
  const { sessions } = req.body;
  if( !sessions ){
    //next();
  }
  try {
    // obtein requeriment
    let task = await Task.findById( id );
    if( !task ){ throw 'No se encontro la tarea a actualizar' }
    req.body.project = task.project;
    // hours after update
    task.sessions = sessions;
    let prevTime = task.time || 0;
    task.time = sessions.reduce( ( acc, session ) =>  acc =+ session.value * session.valueWeight , 0 );
    res.locals.task = task;
    res.locals.project = await updateTime( task.project, task.time, prevTime );
    
    next();
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al cambiar el tiempo de la tarea', error 
    } );
  }
}