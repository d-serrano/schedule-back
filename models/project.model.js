const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name            : { type: String, requiered : true},
    company         : { type: String, requiered : true},
    months          : { type: Number, requiered : true },
    hoursTotal      : [{ type: Number, requiered : true}],
    description     : { type: String, requiered : false},
    finished        : { type: Boolean, default: false },
    creationDate    : { type: Date, required : false },
    startDate       : { type: Date, required : false },
    finishDate      : { type: Date, default :null },
    tasks           : [{ type: Schema.ObjectId, ref: 'Task' }], 
    time            : [{
        minutes             : { type: Number, requiered : true },
        minutesLeft         : { type: Number, requiered : true },
    }]
});

module.exports = mongoose.model( "Project", ProjectSchema );