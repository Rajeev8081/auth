//express setup
const express= require('express');

//used express
const app =express();
const authRouter = require('./routes/authRoutes');
const databaseconnect=require('./config/authdatabase');
const cookieparser = require('cookie-parser');
const cors =require('cors');
databaseconnect();


app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))
app.use('/api/auth',authRouter);


app.use("/",(req,res)=>{
    res.status(200).json({data: 'JWT Auth server update'});

})

module.exports=app; 