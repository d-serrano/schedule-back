const express = require( 'express' );
// controller
const TaskController = require( '../controllers/task.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const updateHours = require( '../middlewares/updateProyectHours' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create task
api.post( "/create",
  [
    check( 'proyect', 'Se debe especificar el proyecto' ).notEmpty(),
    check( 'name', 'El nombre es de la tarea obligatorio' ).notEmpty(),
    check( 'hours', 'El # de horas es obligatorio' ).notEmpty(),
    check( 'hourWeight', 'El peso de la hora es obligatorio' ).notEmpty(),
    check( 'member', 'El usuario es obligatorio' ).notEmpty(),
    updateHours.updateHours
  ],
  TaskController.createTask
);
// get tasks
api.get( "/:id",
  TaskController.getTask
);
// get tasks
api.get( "/",
  TaskController.getTasks
);
// update user
api.put( "/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  TaskController.updateTask 
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