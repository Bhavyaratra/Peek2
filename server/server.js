const express = require('express');
const port = process.env.PORT || 3001;
const cookie = require('cookie');
const app = express();


const routes = require('./router/routes');

app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));

require('./db/conn');

//app.use(urlencoded=true);
app.listen(port,function(err){
    if (err) console.log("404"+err);
    console.log("Server listening on PORT", port);
});

app.use('/api',routes);

app.get('/',(req,res)=>{
    res.send('go to /api');
})

app.use((req,res)=>{
    res.send('404');
})
