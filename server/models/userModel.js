import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const userSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        minLength:[3, 'Name must be at least 3 character'],
        maxLength:[15, 'Name should be less than 15 character'],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
        trim:true,
        lowercase:true,
        match:[/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ , 'Please Enter a valid email address']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[8, 'Password must be at least 8 character '],
        maxLength:[15,'Password should be less than 15 charcater'],
        match:[/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be contains at least one uppercase and one lowercase and one digit and one special character'],
        select:false
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{timestamps:true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods = {
    generateToken: async function(){
        return await JWT.sign(
            {id:this._id, email:this.email, subscription:this.subscription, role:this.role},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRE
            }
        )
    }
}
const User = model('User', userSchema)

export default User