const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    name            : { type: String, requiered : true},
    hours           : { type: Number, requiered : true},
    hourWeight      : { type: Number, requiered : true},
    description     : { type: String, requiered : true},
    finished        : { type: Boolean, default: false },
    success         : { type: Boolean, default: false },
    startDate       : { type: Date, required : true },
    finishDate      : { type: Date, default :null },
    member          : { type: Schema.ObjectId, ref: 'User' },  
    project         : { type: Schema.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model( "Task", TaskSchema );