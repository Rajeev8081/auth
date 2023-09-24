const { use } = require('../app');
const userModel = require('../model/userschema');
const emailValidator =require('email-validator');
const bcrypt =require('bcrypt');

const signup = async(req,res,next)=>{
  const{name,email,password,confirmpassword}=req.body;
  console.log(name,email,password,confirmpassword);
if (!name || !email || !password || !confirmpassword) {
  return res.status(400).json({
    success: false,
    message: 'every field required' 
  })
  
}
const validemail=emailValidator.validate(email);
if (!validemail) {
  return res.status(400).json({
    success: false, 
    message: 'please write a valid email'
  })
  
}
if (password !== confirmpassword) {
  return res.status(400).json({
    success: false,
    message: 'password not match with confirm password'
})
}
try{
  const userinfo= userModel(req.body);
  const result =await userinfo.save();
  return res.status(200).json({
    success: true,
    data: result 
  });
} catch(e){
  if(e.code=== 11000){
    return res.status(400).json({
      success: false,
      message: 'account already exist'
    })
  }

  return res.status(400).json({
    success: false,
    message: e.message
  })

}
 
}



const signin =async(req,res)=>{
  const {email,password}=req.body;
  console.log(email,password);


  if(!email || !password){
    return res.status(400).json({
      success: false,
      message: 'every field is mandetory'
  })
}


try {
  const user =await userModel.findOne({
    email
  })
  .select('+password');
  
 
  if (!user ||!(await bcrypt.compare(password,user.password))) {
    return res.status(400).json({
      success: false,
      message: 'envlaid creadentials'
     })
    }
  const token = user.jwtToken();
  user.password= undefined;
 
  const cookieOption ={
    maxAge: 24 *60 * 60 *1000,
    httpOnly: true
  };
  res.cookie("token",token,cookieOption);
  res.status(200).json({
    success: true,
    data: user
  
  })
} catch (e) {
  res.status(400).json({
    success: false,
    message: e.message
})


}
}

const getuser =async(req,res,next)=>{
  const userid = req.user.id;

  try {
    const user =await userModel.findById(userid);
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    })

    
  }
    
}
 const logout=(req,res,next)=>{
  try {
    const cookieOption={
      expires: new Date(),
      httpOnly: true

    }
    res.cookie("token",null,cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged Out"
    })

  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
     } )
  }

 }
module.exports={signup,signin,getuser,logout}