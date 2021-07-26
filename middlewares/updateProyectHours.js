const Project = require( '../models/proyect.model');
exports.updateHours = async ( req, res, next ) =>{
  const { proyect : proyectId, hours, hourWeight } = req.body;
  //
  try {
    let project = await Project.findById(  proyectId )
    // changed hours in proyect
    let hoursLeft = project.hoursLeft - hours * hourWeight;
    // update proyect
    req.params.hoursLeft = hoursLeft;
    next()
  } catch (error) {
    res.status( 500 ).send( { message: 'Hubo un error al vincular con proyecto', error } );
  }
}