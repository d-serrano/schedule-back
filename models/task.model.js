const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    name            : { type: String, requiered : true },
    time            : { type: Number, requiered : true },
    sessions            :{ type: Array , default :[{
        value           : 0,
        valueWeight     : 1,
        startTime       : null,
        finishTime      : null,
    }]},
    lastRef         : { type: Number, default : 0 },
    isTask          : { type: Boolean, default: false},
    requirement     : { type: String, requiered : true },
    ref             : { type: String, requiered : true },
    contact         : {
        name            : { type: String },
        email           : { type: String }, 
        cellphone       : { type: String } 
    },
    requieredUser   : {
        name            : { type: String , required: true },
        id              : { type: Schema.ObjectId, ref: 'User', required: true }
    },
    member   : {
        name            : { type: String , default : '' },
        email           : { type: String , default : '' },
        id              : { type: Schema.ObjectId, ref: 'User', default : null }
    },
    state           : { type: String, requiered : false, default : 'pendiente' },
    description     : { type: String, default :'' },
    finished        : { type: Boolean, default: false },
    success         : { type: Boolean, default: false },
    requirmentDate  : { type: Date, required : true },
    startDate       : { type: Date, default : null },
    finishDate      : { type: Date, default :null },
    project         : { type: Schema.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model( "Task", TaskSchema );