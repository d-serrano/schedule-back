const express = require( 'express' );
// controller
const Proyectcontroller = require( '../controllers/proyect.controller');
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create 
api.post( "/create",
  [
    check( 'name', 'El nombre es de la tarea obligatorio' ).notEmpty(),
    check( 'hoursTotal', 'El # de horas totales es obligatorio' ).notEmpty(),
  ],
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Proyectcontroller.create
);
// get 
api.get( "/:id",
  Proyectcontroller.get
);
// get 
api.get( "/",
  Proyectcontroller.getList
);
// update 
api.put( "/update/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Proyectcontroller.update 
);
// delete 
api.delete( "/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Proyectcontroller.deleteOne
);
// to do get Members ...


module.exports= api;