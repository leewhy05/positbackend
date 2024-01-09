require('dotenv/config');
const express = require('express')
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const connect = require('./db/mongoDB');
const cloudinary = require('cloudinary').v2;
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRouter');
const auth = require('./middleware/auth')



//port
const port = process.env.PORT || 8000

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// cloudinary config
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

//api
app.use('/api', postRouter)
app.use('/api', userRouter)


app.get('/', function (req, res) {
    res.json({message:'app is running'})
  })
app.use((req, res)=>{
    res.status(404).send({error:"No route found"});
})



//db connection
connect()
.then(()=>{
    try{
      
app.listen(port, ()=>{
    console.log(`Server connected to http://localhost:${port}`);

})
    }catch(error){
        console.log('cannot connect to the server');
    }
})
.catch((error)=>{
    console.log('invalid database connection...!',error);
})
