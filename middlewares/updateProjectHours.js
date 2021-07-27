const Project = require( '../models/project.model');
const Task = require( '../models/task.model');
exports.updateHours = async ( req, res, next ) =>{
  const { project : projectId, hours, hourWeight } = req.body;
  const { prevHours } = res.locals;
  //
  if ( !hours && !hourWeight ) { 
    res.locals.isUpdatedHours = false;
    return  next();
  }
  let prev = prevHours || 0;
  try {
    let project = await Project.findById(  projectId )
    if( !project ) { throw 'No se ha encontrado proyecto para esta tarea' }
    // changed hours in project

    let hoursLeft =  project.hoursLeft + prev - hours * hourWeight ;
    // send to locals
    req.params.hoursLeft = hoursLeft;
    next();
  } catch (error) {
    res.status( 500 ).send( { 
      message: 'Hubo un error al vincular con proyecto', error 
    } );
  }
}

exports.hoursChanged = async ( req, res, next ) => {
  const { id } = req.params;
  
  try {
    // obtein tasks
    let task = await Task.findById( id );
    if( !task ){ throw 'No se encontro la tara a actualizar' }
    res.locals.task = task;
    req.body.project = task.project;
    // hours after update
    res.locals.prevHours = task.hourWeight * task.hours;
    res.locals.isUpdatedHours = true;
    next();
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al corregir las horas de la tarea', error 
    } );
  }
}