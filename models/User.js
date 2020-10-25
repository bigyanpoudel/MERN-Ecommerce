import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default: false
    }
},{
    timestamps : true
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
UserSchema.methods.matchPassword = async function(enteredPassword){
    console.log(enteredPassword);
    console.log(this.password);
    return await bcrypt.compare(enteredPassword,this.password);
}
UserSchema.methods.getJwtToken = async function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}
const User = mongoose.model('User',UserSchema);
export default User;