const mongoose=require('mongoose');
const{Schema}=mongoose;
const JWT =require('jsonwebtoken');
const bcrypt =require('bcrypt');

const userschema = new Schema({
    name:{
        type: String,
        required: [true,'user name is required'],
        minLength: [5,'name must be at least 5 char'],
        maxLenght: [50,'name must be less than 50 char'],
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        unique: [true,'already registered']
    },
    password: {
        type: String,
        select: false
    },
    
    confirmpassword: {
            type: String,
            select: false

     },
    
    forgetPasswordToken: {
        type: String,
    },
    forPasswordExpiryDate: {
        type: Date
    }
    
},{
    timestamp: true
}
);

userschema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next();
        
    }
    this.password =await bcrypt.hash(this.password,10);
    return next();
})


userschema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id , email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user',userschema);

module.exports =userModel;