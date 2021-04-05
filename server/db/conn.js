const dotenv=require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const DB= process.env.dbURI;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((result)=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log('no db connection')
}) 