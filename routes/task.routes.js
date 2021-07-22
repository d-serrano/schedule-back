const express = require( 'express' );
// controller
const TaskController = require( '../controllers/task.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create task
api.post( "/sign-up",
  [
    check( 'name', 'El nombre es obligatorio' ).notEmpty(),
    check( 'lastname', 'El apellido es obligatorio' ).notEmpty(),
    check( 'userName', 'El nombre de usuario es obligatorio' ).notEmpty(),
    check( 'password', 'El password debe ser de al menos 6 caracteres' ).isLength({ min : 6 }),
  ],
  TaskController.createTask
);
// get tasks
api.get( "/:id",
  [ md_auth.ensureAuth], 
  TaskController.getTask
);
// get tasks
api.get( "/",
  [ md_auth.ensureAuth], 
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