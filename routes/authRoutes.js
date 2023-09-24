const express=require('express');
const { signup , signin ,getuser,logout} = require('../controller/authcontroller');
const jwtAuth = require('../middleware/jwtauth');

const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth ,getuser);
authRouter.get('/logout',jwtAuth,logout);

module.exports=authRouter;