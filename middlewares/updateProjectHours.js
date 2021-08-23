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
    return  { 
      timeUsed, 
      id : projectId, 
      arrayId :  project.time[ project.currentMonth - 1 ]._id 
    };
  } catch (error) {
    throw{ message : 'Hubo un error al vincular con proyecto', error} 
  }
}

exports.timeChanged = async ( req, res, next ) => {
  const { id } = req.params;
  const { sessions } = req.body;
  try {
    // obtein requeriment
    let task = await Task.findById( id );
    if( !task ){ throw 'No se encontro la tarea a actualizar' }
    if( !task.isTask ){ throw 'No puedes editar un requerimiento' }
    // save task in locals
    res.locals.task = task;
    if( !sessions ){
      return next();
    }
    req.body.project = task.project;
    // set new sessions array to task
    res.locals.task.sessions = sessions;
    let prevTime = task.time || 0;
    // set new time to task
    res.locals.task.time = sessions.reduce( ( acc, session ) =>  acc += session.value * session.valueWeight , 0 );
    res.locals.project = await updateTime( task.project, task.time, prevTime );   
    next();
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al cambiar el tiempo de la tarea', error 
    } );
  }
}