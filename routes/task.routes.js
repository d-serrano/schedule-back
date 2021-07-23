const express = require( 'express' );
// controller
const TaskController = require( '../controllers/task.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create task
api.post( "/create",
  [
    check( 'name', 'El nombre es de la tarea obligatorio' ).notEmpty(),
    check( 'hours', 'El # de horas es obligatorio' ).notEmpty(),
    check( 'memeber', 'El usuario es obligatorio' ).notEmpty(),
    check( 'start', 'La fecha e inicio es obligatoria' ).notEmpty(),
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