const moment = require ('moment');
const Task = require( '../models/task.model' ); 
// services
const jwt = require('../services/tokens')
//validaciones
const { validationResult } = require( 'express-validator' );

// create task
const createTask = async ( req, res ) =>{
  
}
// get task
const getTask = async ( req, res ) =>{
  
}
// get taska
const getTasks = async ( req, res ) =>{
  
}
// update task
const updateTask = async ( req, res ) =>{
  
}
// delete tasks
const deleteTask = async ( req, res ) =>{
  
}

module.exports = {
	createTask,
  getTask,
	getTasks,
	updateTask,
  deleteTask
}