const express = require('express');
const app = new express();
const gaodeApi = require('./gaodeApi.js');
const upLoadFile = require('./upLoadFile.js');



app.use('/api',gaodeApi);
app.use('/api', upLoadFile);

app.listen(9092,function(){
    console.log("ok 9092")

})




