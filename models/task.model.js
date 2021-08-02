const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    name            : { type: String, requiered : true },
    minutes         : { type: Number, requiered : true },
    timeWeight      : { type: Number, requiered : true },
    timeStimation   : { type: Number, requiered : false },
    isTask           : { type: Boolean, default: false, default : false },
    requirement      : { type: String, requiered : true },
    state           : { type: String, requiered : false, default : 'pendiente' },
    description     : { type: String, requiered : false },
    finished        : { type: Boolean, default: false },
    success         : { type: Boolean, default: false },
    requirmentDate  : { type: Date, required : true },
    startDate       : { type: Date, default : null },
    finishDate      : { type: Date, default :null },
    member          : { type: Schema.ObjectId, ref: 'User' },  
    project         : { type: Schema.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model( "Task", TaskSchema );