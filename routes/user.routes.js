const express = require( 'express' );
// controller
const UserController = require( '../controllers/user.controller' );
// midllewares
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create user
api.post( "/sign-up",
  [
    check( 'name', 'El nombre es obligatorio' ).notEmpty(),
    check( 'lastname', 'El apellido es obligatorio' ).notEmpty(),
    check( 'userName', 'El nombre de usuario es obligatorio' ).notEmpty(),
    check( 'password', 'El password debe ser de al menos 6 caracteres' ).isLength({ min : 6 }),
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
// update user

// delete user

// to do get Members ...


module.exports= api;