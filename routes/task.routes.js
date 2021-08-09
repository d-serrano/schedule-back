const express = require( 'express' );
// controller
const TaskController = require( '../controllers/task.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const updateHours = require( '../middlewares/updateProjectHours' );
const validator = require( '../middlewares/validator' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create task
api.post( "/create",
  [
    check( 'project', 'Se debe especificar el proyecto' ).notEmpty(),
    check( 'name', 'El nombre es de la tarea obligatorio' ).notEmpty(),
    check( 'requirement', 'El requerimiento es obligatorio' ).notEmpty(),
    check( 'contact', 'Un contacto es requeirdo' ).notEmpty(),
    validator.validator,
    md_auth.ensureAuth,
  ],
  TaskController.createTask
);
// get task
api.get( "/:id",
  TaskController.getTask
);
// update task
api.put( "/update/:id",
  [ 
    check( 'hours', 'El # de minutos es obligatorio' ).notEmpty(),
    check( 'hourWeight', 'El peso de la hora es obligatorio' ).notEmpty(),
    validator.validator,
    md_auth.ensureAuth,
    md_auth.isAdmin,
  ], 
  TaskController.updateTask 
);
// set requeriment as task
api.put( "/setTask/:id",
  [ 
    check( 'hours', 'Este endpoint no actualiza las horas' ).isEmpty(),
    check( 'hourWeight', 'Este endpoint no actualiza las horas' ).isEmpty(),
    check( 'member', 'El usuario es obligatorio' ).notEmpty(),
    validator.validator,
    md_auth.ensureAuth,
    md_auth.isAdmin,
  ], 
  TaskController.updateTask 
);
// update task with Hours
api.put( "/update-hours/:id",
  [ 
    check( 'hours', 'El # de horas es obligatorio' ).notEmpty(),
    check( 'hourWeight', 'El peso de la hora es obligatorio' ).notEmpty(),
    validator.validator,
    md_auth.ensureAuth,
    md_auth.isAdmin,
    updateHours.hoursChanged,
    updateHours.updateHours
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