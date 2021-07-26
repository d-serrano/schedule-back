const Project = require( '../models/proyect.model');
const Task = require( '../models/task.model');
exports.updateHours = async ( req, res, next ) =>{
  console.log( ' updateHours ' )
  const { proyect : proyectId, hours, hourWeight } = req.body;
  const { prevHours } = res.locals;
  //
  if ( !hours && !hourWeight ) { 
    res.locals.isupdatedHours = false;
    return  next() 
  }
  console.log( { hours: hours, hourWeight: hourWeight})
  let prev = prevHours || 0;
  try {
    let project = await Project.findById(  proyectId )
    // changed hours in proyect
    let hoursLeft =  project.hoursLeft + prev - hours * hourWeight ;
    // update proyect
    req.params.hoursLeft = hoursLeft;
    res.locals.isupdatedHours = true;
    next()
  } catch (error) {
    res.status( 500 ).send( { 
      message: 'Hubo un error al vincular con proyecto', error 
    } );
  }
}

exports.hoursChanged = async ( req, res, next ) => {
  const { id } = req.params;
  const { hours, hourWeight } = req.body;
  if ( !hours && !hourWeight ) { return next('') }
  console.log(  'sigue en hours changed')
  try {
    let task = await Task.findById( id );
    let prevHours = task.hourWeight * task.hours;
    res.locals.prevHours = prevHours;
    res.locals.task = task;
    req.body.hours = hours || task.hours;
    req.body.hourWeight = hourWeight || task.hourWeight;
  } catch (error) { 
    res.status( 500 ).send( { 
      message: 'Hubo un error al corregir las horas de la tarea', error 
    } );
  }
}