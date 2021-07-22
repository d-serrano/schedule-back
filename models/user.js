const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const UserSchema = Schema({
    names               : { type : String, required : true },
    lastname            : { type : String, required : true },
    password            : { type : String, required : true },
    email               : { type :String, unique : true, required : true },
    isAdmin             : { type: Boolean, unique: true, required : true, default: false },
    role                : { type :String, default: 'user' },
    active              : { type :Boolean, default: true }, 
    tasks               : [{type: Schema.ObjectId, ref: 'Task'}],
    avatar              : {
        url      : { type: String, default : null },
        publicId : { type: String, default : null }
    },
    cellphone           : { type : String, default : null },
    identificationType  : { type : String, },
    IdentificationId    : { type : String, default : null },
    signUpDate          : { type : Date, default: Date.now() },
});

module.exports = mongoose.model( "User", UserSchema );