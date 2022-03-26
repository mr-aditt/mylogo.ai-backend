var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        useremail:{type:String, unique: true},
        password:{type:String},
        image:{type:Array}
    },
    {collection:'credential'}
)

const logoSchema = new mongoose.Schema(
    {
        image:{type:String},
        saved:{ type: Boolean, default: false }
    },
    {collection:'logosDB'}
)

const User = mongoose.model('User', userSchema)
const Logo = mongoose.model('Logo', logoSchema)

module.exports = {User, Logo}