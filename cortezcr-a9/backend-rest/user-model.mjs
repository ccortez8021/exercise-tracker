import mongoose from 'mongoose';
import brcypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
},{
    timestamps: true
});

//Hash password before saving
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return next();

    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
});

//Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword){
    return await brcypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;