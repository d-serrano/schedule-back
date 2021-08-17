const express = require( 'express' );
// controller
const RequirementController = require( '../controllers/requirements.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const updateTime = require( '../middlewares/updateProjectHours' );
const validator = require( '../middlewares/validator' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();


// ******************************************************
// *****************   Requeriments   *******************
// ******************************************************

// create requirement
api.post( "/",
  [
    check( 'project', 'Se debe especificar el proyecto.' ).notEmpty(),
    check( 'name', 'El nombre es de la tarea obligatorio.' ).notEmpty(),
    check( 'requirement', 'El requerimiento es obligatorio.' ).notEmpty(),
    check( 'contact', 'Un contacto es requeirdo.' ).notEmpty(),
    check( 'startDate', 'La fecha es obligatoria.' ),
    check( 'description', 'La descripción es obligatoria.' ),
    check( 'finished', 'Es neceario aclarar si ha finaizado' ),
    validator.validator,
    md_auth.ensureAuth,
  ],
  RequirementController.createReq
);
// get req
api.get( "/:id",
  RequirementController.getReq
);

// update req
api.put( "/:id",
  [ 
    validator.validator,
    md_auth.ensureAuth,
  ], 
  RequirementController.updateReq 
);

// set requeriment as task
api.put( "/set-time/:id",
[ 
  check( 'description', 'Debe escribir una descripción' ).notEmpty(),
  check( 'success', 'Debe espeificar si se completo con exito' ).notEmpty(),
  check( 'time', 'El tiempo es obligatorio' ).notEmpty(),
  check( 'timeWeight', 'El peso del tiempo es obligatorio' ).notEmpty(),
  validator.validator,
  md_auth.ensureAuth,
  md_auth.isMember,
  updateTime.timeChanged
], 
  RequirementController.setAsTask 
);

module.exports= api;