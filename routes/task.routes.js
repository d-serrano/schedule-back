const express = require( 'express' );
// controller
const TaskController = require( '../controllers/task.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const updateTime = require( '../middlewares/updateProjectHours' );
const validator = require( '../middlewares/validator' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();

api.get( "/:id",
  TaskController.getTask
);

// update task
api.put( "/update/:id",
  [ 
    check( 'requeriment', 'no puedes cambiar el requerimiento' ).isEmpty(),
    check( 'name', 'no puedes cambiar el titulo del requerimiento' ).isEmpty(),
    validator.validator,
    md_auth.ensureAuth,
    md_auth.isMember,
    updateTime.timeChanged
  ], 
  TaskController.updateTask 
);
// update task with Hours
api.put( "/set-time/:id",
  [ 
    check( 'sessions', 'El tiempo es obligatorio' ).notEmpty(),
    validator.validator,
    md_auth.ensureAuth,
    md_auth.isMember,
    updateTime.timeChanged
  ], 
  TaskController.updateTaskHours 
);
// delete task
api.delete( "/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  TaskController.deleteTask
);
// to do get Members ...


module.exports= api;