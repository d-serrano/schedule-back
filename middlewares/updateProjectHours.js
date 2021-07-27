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
  console.log( ' updateHours ', { projectId } )
  try {
    let project = await Project.findById(  projectId )
    if( !project ) { throw 'No se ha encontrado proyecto para esta tarea' }
    // changed hours in project

    let hoursLeft =  project.hoursLeft + prev - hours * hourWeight ;
    // send to locals
    req.params.hoursLeft = hoursLeft;
    res.locals.isUpdatedHours = true;
    console.log( { hours, hourWeight, hoursLeft})
    next();
  } catch (error) {
    res.status( 500 ).send( { 
      message: 'Hubo un error al vincular con proyecto', error 
    } );
  }
}

exports.hoursChanged = async ( req, res, next ) => {
  const { id } = req.params;
  const { hours, hourWeight } = req.body;
  try {
    // obtein tasks
    let task = await Task.findById( id );
    if( !task ){ throw 'No se encontro la tara a actualizar' }
    res.locals.task = task;
    // verify if the hours changed
    if ( hours === task.hours && hourWeight === task.hourWeight ) { return next('') }
    // hours after update
    res.locals.prevHours = task.hourWeight * task.hours;
    req.body.project = task.project;
    next();
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al corregir las horas de la tarea', error 
    } );
  }
}