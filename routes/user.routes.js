const express = require( 'express' );
// controller
const UserController = require( '../controllers/user.controller' );
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
const validatior = require( '../middlewares/validator' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create user
api.post( "/sign-up",
  [
    check( 'name', 'El nombre es obligatorio' ).notEmpty(),
    check( 'lastname', 'El apellido es obligatorio' ).notEmpty(),
    check( 'email', 'El email de usuario es obligatorio' ).notEmpty(),
    check( 'userName', 'El nombre de usuario es obligatorio' ).notEmpty(),
    check( 'password', 'El password debe ser de al menos 6 caracteres' ).isLength({ min : 6 }),
    validatior.validator
  ],
  UserController.signUp 
);
// log in user
api.post( "/login",
[
  check( 'userName', 'El nombre de usuario es obligatorio' ).notEmpty(),
],
  UserController.login 
);
// is Auth
api.get( '/auth', 
  [ md_auth.ensureAuth], 
  UserController.auth
)
// update user
api.put( "/update/:id",
  [ md_auth.ensureAuth], 
  UserController.updateUser 
);
// delete user
api.delete( "/delete/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  UserController.deleteUser 
);
// to do get Members ...


module.exports= api;