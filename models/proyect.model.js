const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name            : { type: String, requiered : true},
    hoursTotal          : { type: Number, requiered : true},
    hoursLeft           : { type: Number, requiered : true},
    hoursUsed           : { type: Number, requiered : true},
    description     : { type: String, requiered : true},
    finished        : { type: Boolean, default: false },
    startDate       : { type: Date, required : true },
    finishDate      : { type: Date, default :null },
    tasks         :  [{ type: Schema.ObjectId, ref: 'Task' }],  
});

module.exports = mongoose.model( "Project", ProjectSchema );