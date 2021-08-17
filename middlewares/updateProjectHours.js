const Project = require( '../models/project.model');
const Task = require( '../models/task.model');

const updateTime = async ( projectId, time, timeWeight, prevTime ) =>{
  try {
    let project = await Project.findById(  projectId )
    if( !project ) { throw 'No se ha encontrado proyecto para esta tarea' }
    // changed hours in project
    const projectTime = project.time[ project.currentMonth - 1 ];
    const timeUsed =  projectTime.minutesUsed - prevTime + time * timeWeight ;
    // set new time
    let projectData = { timeUsed, id : projectId, arrayId :  project.time[ project.currentMonth - 1 ]._id };

    return  projectData;
  } catch (error) {
    throw{ message : 'Hubo un error al vincular con proyecto', error} 
  }
}

exports.timeChanged = async ( req, res, next ) => {
  const { id } = req.params;
  const { time, timeWeight } = req.body;
  try {
    // obtein requeriment
    let task = await Task.findById( id );
    if( !task ){ throw 'No se encontro la tarea a actualizar' }
    req.body.project = task.project;
    // hours after update
    if( !time && !timeWeight ){
      next();
    }
    let prevTime = task.time ? task.timeWeight * task.time : 0;
    res.locals.task = task;
    res.locals.project = await updateTime( task.project, time, timeWeight, prevTime );
    next();
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al cambiar el tiempo de la tarea', error 
    } );
  }
}