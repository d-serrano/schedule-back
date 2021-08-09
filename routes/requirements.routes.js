const express = require( 'express' );
// controller
const RequirementController = require( '../controllers/requirements.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const updateHours = require( '../middlewares/updateProjectHours' );
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
    check( 'project', 'Se debe especificar el proyecto' ).notEmpty(),
    check( 'name', 'El nombre es de la tarea obligatorio' ).notEmpty(),
    check( 'requirement', 'El requerimiento es obligatorio' ).notEmpty(),
    check( 'contact', 'Un contacto es requeirdo' ).notEmpty(),
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
api.put( "asTask/:id",
[ 
  check( 'member', 'El usuario es obligatorio' ).notEmpty(),
  validator.validator,
  md_auth.ensureAuth,
  md_auth.isAdmin,
], 
  RequirementController.setAsTask 
);

module.exports= api;